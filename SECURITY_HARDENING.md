# Security Hardening Guide - SKY4444 Enterprise Platform

## Overview

This document outlines all security measures implemented in the production-hardened branch of SKY4444. Follow these guidelines to maintain security standards.

---

## 1. Authentication & Authorization

### OAuth 2.0 Implementation

```typescript
// Secure OAuth flow
const handleOAuthCallback = async (code: string, state: string) => {
  // Verify state parameter to prevent CSRF
  if (state !== sessionStorage.getItem('oauth_state')) {
    throw new Error('Invalid state parameter');
  }

  // Exchange code for token
  const response = await fetch(`${OAUTH_SERVER_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      client_id: VITE_APP_ID,
      client_secret: JWT_SECRET, // Never expose in frontend
      redirect_uri: window.location.origin + '/callback'
    })
  });

  const { access_token } = await response.json();
  
  // Store in secure, httpOnly cookie
  document.cookie = `auth_token=${access_token}; HttpOnly; Secure; SameSite=Strict`;
};
```

### Protected Procedures

```typescript
// tRPC protected procedure
export const protectedProcedure = baseProcedure
  .use(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({ ctx });
  });

// Usage
export const userRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    // User is guaranteed to exist
    return db.user.findUnique({ where: { id: ctx.user.id } });
  })
});
```

### Role-Based Access Control (RBAC)

```typescript
export const adminProcedure = protectedProcedure
  .use(async ({ ctx, next }) => {
    if (ctx.user.role !== 'admin') {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return next({ ctx });
  });

// Usage
export const adminRouter = router({
  deleteUser: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      return db.user.delete({ where: { id: input.userId } });
    })
});
```

---

## 2. Data Protection

### Encryption at Rest

```typescript
// Encrypt sensitive data before storing
import crypto from 'crypto';

const encryptData = (data: string, key: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key), iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
};

const decryptData = (encrypted: string, key: string): string => {
  const [iv, authTag, data] = encrypted.split(':');
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(key),
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
```

### Secure Password Hashing

```typescript
import bcrypt from 'bcrypt';

// Hash password
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12; // Increase for higher security
  return bcrypt.hash(password, saltRounds);
};

// Verify password
const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Usage in authentication
export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({ where: { email: input.email } });
      
      if (!user) throw new TRPCError({ code: 'NOT_FOUND' });
      
      const isValid = await verifyPassword(input.password, user.passwordHash);
      if (!isValid) throw new TRPCError({ code: 'UNAUTHORIZED' });
      
      // Create session
      return createSession(user);
    })
});
```

### SQL Injection Prevention

```typescript
// ✅ SAFE: Using parameterized queries with Drizzle
const user = await db.user.findUnique({
  where: { email: userInput.email } // Parameterized
});

// ❌ UNSAFE: String concatenation
const user = await db.query(`SELECT * FROM users WHERE email = '${userInput.email}'`);
```

---

## 3. API Security

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// Create rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/api/health';
  }
});

// Apply to all API routes
app.use('/api/', limiter);
```

### Input Validation

```typescript
import { z } from 'zod';

// Define strict schemas
const createUserSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(12).max(128),
  name: z.string().min(1).max(255),
  age: z.number().int().min(18).max(150)
});

// Validate in procedures
export const userRouter = router({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      // input is guaranteed to match schema
      return db.user.create({ data: input });
    })
});
```

### CORS Configuration

```typescript
import cors from 'cors';

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://skycoin4444.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600
};

app.use(cors(corsOptions));
```

### CSRF Protection

```typescript
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Include CSRF token in responses
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Validate CSRF token on state-changing requests
app.post('/api/trpc/*', (req, res, next) => {
  if (!req.csrfToken()) {
    return res.status(403).json({ error: 'CSRF token missing' });
  }
  next();
});
```

---

## 4. Network Security

### HTTPS/TLS

```typescript
// Enforce HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(301, `https://${req.header('host')}${req.url}`);
  }
  next();
});
```

### Security Headers

```typescript
import helmet from 'helmet';

// Add security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.manus.im']
    }
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true
}));
```

---

## 5. Secrets Management

### Environment Variables

```typescript
// ✅ SAFE: Load from environment
const apiKey = process.env.OPENAI_API_KEY;

// ❌ UNSAFE: Hardcoded secrets
const apiKey = 'sk-1234567890abcdef';

// ❌ UNSAFE: Committed to version control
// .env file should be in .gitignore
```

### Secret Rotation

```bash
# Rotate API keys regularly
# 1. Generate new key
# 2. Update environment variable
# 3. Test with new key
# 4. Revoke old key
# 5. Monitor for any issues

# Schedule: Every 90 days
# Critical keys: Every 30 days
```

---

## 6. Dependency Security

### Vulnerability Scanning

```bash
# Check for vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit --fix

# Update dependencies safely
pnpm update --interactive

# Check specific package
pnpm audit --package-name express
```

### Dependency Pinning

```json
{
  "dependencies": {
    "express": "4.18.2",
    "bcrypt": "5.1.0",
    "zod": "3.22.4"
  },
  "devDependencies": {
    "typescript": "5.1.6",
    "vitest": "0.34.1"
  }
}
```

---

## 7. Logging & Monitoring

### Secure Logging

```typescript
// ✅ SAFE: Log non-sensitive data
logger.info('User login', { userId: user.id, timestamp: Date.now() });

// ❌ UNSAFE: Log sensitive data
logger.info('User login', { email: user.email, password: user.password });

// Sanitize logs
const sanitizeLog = (obj: any): any => {
  const sensitiveKeys = ['password', 'token', 'apiKey', 'secret'];
  const sanitized = { ...obj };
  
  sensitiveKeys.forEach(key => {
    if (sanitized[key]) {
      sanitized[key] = '***REDACTED***';
    }
  });
  
  return sanitized;
};
```

### Audit Logging

```typescript
// Log all security-relevant events
const auditLog = async (action: string, userId: string, details: any) => {
  await db.auditLog.create({
    data: {
      action,
      userId,
      details: JSON.stringify(details),
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    }
  });
};

// Usage
await auditLog('USER_LOGIN', user.id, { method: 'oauth' });
await auditLog('ADMIN_DELETE_USER', admin.id, { targetUserId: user.id });
await auditLog('API_KEY_ROTATED', user.id, { keyId: oldKey.id });
```

---

## 8. Testing Security

### Security Test Suite

```typescript
// vitest security tests
describe('Security', () => {
  test('should reject invalid JWT tokens', async () => {
    const response = await request(app)
      .get('/api/trpc/user.getProfile')
      .set('Authorization', 'Bearer invalid-token');
    
    expect(response.status).toBe(401);
  });

  test('should prevent SQL injection', async () => {
    const response = await request(app)
      .post('/api/trpc/user.search')
      .send({ query: "'; DROP TABLE users; --" });
    
    expect(response.status).toBe(400);
  });

  test('should enforce rate limiting', async () => {
    for (let i = 0; i < 101; i++) {
      await request(app).get('/api/health');
    }
    
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(429); // Too Many Requests
  });

  test('should require authentication for protected routes', async () => {
    const response = await request(app)
      .get('/api/trpc/user.getProfile');
    
    expect(response.status).toBe(401);
  });
});
```

---

## 9. Incident Response

### Security Incident Checklist

- [ ] Identify and isolate the incident
- [ ] Notify security team immediately
- [ ] Document timeline and impact
- [ ] Preserve evidence and logs
- [ ] Contain the breach
- [ ] Eradicate the threat
- [ ] Recover systems
- [ ] Post-incident review
- [ ] Implement preventive measures

### Breach Notification

```typescript
const notifySecurityBreach = async (incident: SecurityIncident) => {
  // Notify security team
  await sendSlackAlert({
    channel: '#security-incidents',
    message: `🚨 Security Incident: ${incident.type}`,
    details: incident
  });

  // Log incident
  await db.securityIncident.create({ data: incident });

  // Trigger incident response
  await triggerIncidentResponse(incident);
};
```

---

## 10. Compliance & Audits

### Security Checklist

- [ ] All secrets in environment variables
- [ ] No hardcoded credentials
- [ ] All endpoints validated
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Security headers set
- [ ] Audit logging enabled
- [ ] Dependencies up-to-date
- [ ] Tests passing
- [ ] Code reviewed

### Regular Audits

```bash
# Weekly
- pnpm audit
- Review security logs
- Check for failed authentication attempts

# Monthly
- Dependency updates
- Security patches
- Code review for security issues

# Quarterly
- Penetration testing
- Security assessment
- Compliance review

# Annually
- SOC 2 audit
- GDPR compliance check
- Security training
```

---

## 11. Best Practices Summary

✅ **DO:**
- Use HTTPS everywhere
- Validate all inputs
- Hash passwords with bcrypt
- Use parameterized queries
- Implement rate limiting
- Log security events
- Keep dependencies updated
- Use environment variables for secrets
- Enable CORS only for trusted origins
- Implement proper error handling

❌ **DON'T:**
- Hardcode secrets
- Log sensitive data
- Use weak passwords
- Trust user input
- Expose error details
- Use deprecated libraries
- Commit .env files
- Disable security headers
- Allow unlimited requests
- Store passwords in plain text

---

## Contact & Support

For security issues, contact: security@skycoin4444.com

**Do not disclose security vulnerabilities publicly. Use responsible disclosure.**
