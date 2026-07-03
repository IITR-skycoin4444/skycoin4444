# Testing Guide - SKY4444 Enterprise Platform

**Version**: 1.0.0-enterprise  
**Last Updated**: 2026-07-03

---

## 📋 Testing Strategy

This guide outlines the comprehensive testing strategy for SKY4444, covering unit tests, integration tests, end-to-end tests, performance tests, and security tests.

### Testing Pyramid

```
        ┌─────────────────┐
        │   E2E Tests     │  (5-10%)
        │  (User Flows)   │
        ├─────────────────┤
        │ Integration     │  (15-25%)
        │   Tests         │
        ├─────────────────┤
        │  Unit Tests     │  (60-80%)
        │ (Business Logic)│
        └─────────────────┘
```

---

## 1. Unit Tests

### Setup

```bash
# Run all unit tests
pnpm test

# Run specific test file
pnpm test server/auth.logout.test.ts

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# Debug tests
node --inspect-brk ./node_modules/vitest/vitest.mjs run
```

### Unit Test Examples

#### Authentication Tests

```typescript
// server/auth.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { hashPassword, verifyPassword } from './auth';

describe('Authentication', () => {
  describe('Password Hashing', () => {
    it('should hash password correctly', async () => {
      const password = 'SecurePassword123!';
      const hash = await hashPassword(password);
      
      expect(hash).not.toBe(password);
      expect(hash).toHaveLength(60); // bcrypt hash length
    });

    it('should verify correct password', async () => {
      const password = 'SecurePassword123!';
      const hash = await hashPassword(password);
      
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'SecurePassword123!';
      const hash = await hashPassword(password);
      
      const isValid = await verifyPassword('WrongPassword', hash);
      expect(isValid).toBe(false);
    });

    it('should handle special characters', async () => {
      const password = 'P@$$w0rd!#%&*()[]{}';
      const hash = await hashPassword(password);
      
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });
  });

  describe('JWT Tokens', () => {
    it('should create valid JWT token', () => {
      const token = createJWT({ userId: '123', email: 'user@example.com' });
      
      expect(token).toBeDefined();
      expect(token.split('.')).toHaveLength(3); // JWT format
    });

    it('should verify valid JWT token', () => {
      const payload = { userId: '123', email: 'user@example.com' };
      const token = createJWT(payload);
      
      const decoded = verifyJWT(token);
      expect(decoded.userId).toBe(payload.userId);
    });

    it('should reject invalid JWT token', () => {
      expect(() => verifyJWT('invalid.token.here')).toThrow();
    });

    it('should reject expired JWT token', () => {
      const expiredToken = createJWT({ userId: '123' }, { expiresIn: '-1h' });
      expect(() => verifyJWT(expiredToken)).toThrow();
    });
  });
});
```

#### Database Tests

```typescript
// server/db.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from './db';

describe('Database Operations', () => {
  let testUserId: string;

  beforeEach(async () => {
    // Create test user
    const user = await db.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed_password'
      }
    });
    testUserId = user.id;
  });

  afterEach(async () => {
    // Cleanup
    await db.user.delete({ where: { id: testUserId } });
  });

  it('should create user', async () => {
    const user = await db.user.findUnique({ where: { id: testUserId } });
    expect(user).toBeDefined();
    expect(user?.email).toBe('test@example.com');
  });

  it('should update user', async () => {
    await db.user.update({
      where: { id: testUserId },
      data: { name: 'Updated Name' }
    });

    const user = await db.user.findUnique({ where: { id: testUserId } });
    expect(user?.name).toBe('Updated Name');
  });

  it('should delete user', async () => {
    await db.user.delete({ where: { id: testUserId } });

    const user = await db.user.findUnique({ where: { id: testUserId } });
    expect(user).toBeNull();
  });

  it('should handle unique constraint', async () => {
    expect(async () => {
      await db.user.create({
        data: {
          email: 'test@example.com',
          name: 'Duplicate',
          passwordHash: 'hashed'
        }
      });
    }).rejects.toThrow();
  });
});
```

#### API Endpoint Tests

```typescript
// server/routers.test.ts
import { describe, it, expect } from 'vitest';
import { createTRPCMsw } from 'trpc-msw';
import { appRouter } from './routers';

describe('tRPC Procedures', () => {
  describe('User Router', () => {
    it('should get user profile', async () => {
      const caller = appRouter.createCaller({
        user: { id: 'test-user-id', role: 'user' }
      });

      const profile = await caller.user.getProfile();
      expect(profile).toBeDefined();
      expect(profile.id).toBe('test-user-id');
    });

    it('should reject unauthorized access', async () => {
      const caller = appRouter.createCaller({ user: null });

      expect(async () => {
        await caller.user.getProfile();
      }).rejects.toThrow('UNAUTHORIZED');
    });

    it('should update user settings', async () => {
      const caller = appRouter.createCaller({
        user: { id: 'test-user-id', role: 'user' }
      });

      const updated = await caller.user.updateSettings({
        theme: 'dark',
        notifications: false
      });

      expect(updated.theme).toBe('dark');
    });
  });
});
```

---

## 2. Integration Tests

### Setup

```bash
# Run integration tests
pnpm test:integration

# Run specific integration test
pnpm test:integration marketplace.test.ts

# Integration tests with coverage
pnpm test:integration:coverage
```

### Integration Test Examples

#### Marketplace Integration

```typescript
// tests/integration/marketplace.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createTestClient } from './test-client';

describe('Marketplace Integration', () => {
  let client: any;
  let productId: string;

  beforeAll(async () => {
    client = await createTestClient();
  });

  afterAll(async () => {
    await client.cleanup();
  });

  it('should create product listing', async () => {
    const response = await client.marketplace.createListing({
      title: 'Test Product',
      description: 'A test product',
      price: 99.99,
      category: 'electronics'
    });

    expect(response.id).toBeDefined();
    productId = response.id;
  });

  it('should search products', async () => {
    const results = await client.marketplace.search({
      query: 'Test Product',
      category: 'electronics'
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain('Test Product');
  });

  it('should purchase product', async () => {
    const order = await client.marketplace.createOrder({
      productId,
      quantity: 1,
      paymentMethod: 'credit_card'
    });

    expect(order.status).toBe('pending');
    expect(order.total).toBe(99.99);
  });

  it('should track order status', async () => {
    const orders = await client.marketplace.getOrders();
    expect(orders.length).toBeGreaterThan(0);
  });
});
```

#### Trading Integration

```typescript
// tests/integration/trading.test.ts
import { describe, it, expect, beforeAll } from 'vitest';
import { createTestClient } from './test-client';

describe('Trading Integration', () => {
  let client: any;

  beforeAll(async () => {
    client = await createTestClient();
  });

  it('should get market data', async () => {
    const data = await client.trading.getMarketData('BTC');

    expect(data.symbol).toBe('BTC');
    expect(data.price).toBeGreaterThan(0);
    expect(data.volume).toBeGreaterThan(0);
  });

  it('should place buy order', async () => {
    const order = await client.trading.placeBuyOrder({
      symbol: 'BTC',
      quantity: 0.1,
      price: 62000
    });

    expect(order.status).toBe('pending');
    expect(order.type).toBe('buy');
  });

  it('should place sell order', async () => {
    const order = await client.trading.placeSellOrder({
      symbol: 'BTC',
      quantity: 0.1,
      price: 63000
    });

    expect(order.status).toBe('pending');
    expect(order.type).toBe('sell');
  });

  it('should cancel order', async () => {
    const order = await client.trading.placeBuyOrder({
      symbol: 'BTC',
      quantity: 0.1,
      price: 62000
    });

    const cancelled = await client.trading.cancelOrder(order.id);
    expect(cancelled.status).toBe('cancelled');
  });
});
```

---

## 3. End-to-End Tests

### Setup

```bash
# Run E2E tests
pnpm test:e2e

# Run specific E2E test
pnpm test:e2e user-signup.e2e.ts

# E2E tests in headed mode
pnpm test:e2e --headed

# Debug E2E tests
pnpm test:e2e --debug
```

### E2E Test Examples

#### User Signup Flow

```typescript
// tests/e2e/user-signup.e2e.ts
import { test, expect } from '@playwright/test';

test.describe('User Signup Flow', () => {
  test('should complete signup process', async ({ page }) => {
    // Navigate to signup
    await page.goto('http://localhost:5173/signup');

    // Fill email
    await page.fill('input[name="email"]', 'newuser@example.com');

    // Fill password
    await page.fill('input[name="password"]', 'SecurePassword123!');
    await page.fill('input[name="confirmPassword"]', 'SecurePassword123!');

    // Fill name
    await page.fill('input[name="name"]', 'John Doe');

    // Accept terms
    await page.check('input[name="terms"]');

    // Submit form
    await page.click('button:has-text("Sign Up")');

    // Wait for success
    await page.waitForURL('http://localhost:5173/dashboard');
    expect(page.url()).toContain('/dashboard');
  });

  it('should show validation errors', async ({ page }) => {
    await page.goto('http://localhost:5173/signup');

    // Try to submit empty form
    await page.click('button:has-text("Sign Up")');

    // Check for error messages
    const errors = await page.locator('.error-message');
    expect(await errors.count()).toBeGreaterThan(0);
  });

  it('should prevent duplicate email', async ({ page }) => {
    await page.goto('http://localhost:5173/signup');

    // Fill with existing email
    await page.fill('input[name="email"]', 'existing@example.com');
    await page.fill('input[name="password"]', 'SecurePassword123!');
    await page.fill('input[name="confirmPassword"]', 'SecurePassword123!');
    await page.fill('input[name="name"]', 'John Doe');
    await page.check('input[name="terms"]');

    // Submit form
    await page.click('button:has-text("Sign Up")');

    // Check for duplicate error
    const error = await page.locator('text=Email already exists');
    await expect(error).toBeVisible();
  });
});
```

#### Trading Flow

```typescript
// tests/e2e/trading-flow.e2e.ts
import { test, expect } from '@playwright/test';

test.describe('Trading Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('http://localhost:5173/login');
    await page.fill('input[name="email"]', 'trader@example.com');
    await page.fill('input[name="password"]', 'SecurePassword123!');
    await page.click('button:has-text("Login")');
    await page.waitForURL('http://localhost:5173/dashboard');
  });

  test('should execute buy order', async ({ page }) => {
    // Navigate to trading
    await page.goto('http://localhost:5173/trading');

    // Select cryptocurrency
    await page.click('text=Bitcoin');

    // Enter quantity
    await page.fill('input[name="quantity"]', '0.1');

    // Set price
    await page.fill('input[name="price"]', '62000');

    // Place order
    await page.click('button:has-text("Buy")');

    // Verify order placed
    const success = await page.locator('text=Order placed successfully');
    await expect(success).toBeVisible();

    // Check order in history
    await page.goto('http://localhost:5173/trading/orders');
    const order = await page.locator('text=0.1 BTC');
    await expect(order).toBeVisible();
  });

  test('should cancel pending order', async ({ page }) => {
    // Navigate to orders
    await page.goto('http://localhost:5173/trading/orders');

    // Find pending order
    const pendingOrder = await page.locator('[data-status="pending"]').first();

    // Click cancel
    await pendingOrder.locator('button:has-text("Cancel")').click();

    // Confirm cancellation
    await page.click('button:has-text("Confirm")');

    // Verify order cancelled
    const cancelled = await page.locator('text=Order cancelled');
    await expect(cancelled).toBeVisible();
  });
});
```

---

## 4. Performance Tests

### Load Testing

```bash
# Run load tests
pnpm test:load

# Load test with custom duration
pnpm test:load --duration 10m

# Load test with custom concurrency
pnpm test:load --concurrency 100
```

### Load Test Example

```typescript
// tests/performance/load.test.ts
import { test, expect } from '@playwright/test';
import { performance } from 'perf_hooks';

test.describe('Performance - Load Testing', () => {
  test('should handle 100 concurrent requests', async ({ page }) => {
    const startTime = performance.now();
    const promises = [];

    for (let i = 0; i < 100; i++) {
      promises.push(
        fetch('http://localhost:3000/api/health')
          .then(r => r.json())
      );
    }

    const results = await Promise.all(promises);
    const endTime = performance.now();

    expect(results).toHaveLength(100);
    expect(results.every(r => r.status === 'healthy')).toBe(true);
    expect(endTime - startTime).toBeLessThan(5000); // Should complete in <5s
  });

  test('should maintain response time under load', async ({ page }) => {
    const times: number[] = [];

    for (let i = 0; i < 50; i++) {
      const start = performance.now();
      await fetch('http://localhost:3000/api/trpc/user.getProfile');
      const end = performance.now();
      times.push(end - start);
    }

    const avgTime = times.reduce((a, b) => a + b) / times.length;
    const p95 = times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)];

    expect(avgTime).toBeLessThan(100); // Avg < 100ms
    expect(p95).toBeLessThan(500); // P95 < 500ms
  });
});
```

---

## 5. Security Tests

### Security Test Suite

```bash
# Run security tests
pnpm test:security

# Run OWASP security tests
pnpm test:security:owasp

# Run dependency security audit
pnpm audit
```

### Security Test Examples

```typescript
// tests/security/security.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server/_core/index';

describe('Security Tests', () => {
  describe('Authentication', () => {
    it('should reject missing JWT token', async () => {
      const response = await request(app)
        .get('/api/trpc/user.getProfile');

      expect(response.status).toBe(401);
    });

    it('should reject invalid JWT token', async () => {
      const response = await request(app)
        .get('/api/trpc/user.getProfile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });

    it('should reject expired JWT token', async () => {
      const expiredToken = createExpiredJWT();

      const response = await request(app)
        .get('/api/trpc/user.getProfile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
    });
  });

  describe('Input Validation', () => {
    it('should reject SQL injection attempts', async () => {
      const response = await request(app)
        .post('/api/trpc/user.search')
        .send({ query: "'; DROP TABLE users; --" });

      expect(response.status).toBe(400);
    });

    it('should reject XSS attempts', async () => {
      const response = await request(app)
        .post('/api/trpc/user.updateProfile')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ name: '<script>alert("xss")</script>' });

      expect(response.status).toBe(400);
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/trpc/user.create')
        .send({ email: 'invalid-email', password: 'password' });

      expect(response.status).toBe(400);
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limiting', async () => {
      const requests = [];

      for (let i = 0; i < 101; i++) {
        requests.push(request(app).get('/api/health'));
      }

      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status === 429);

      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });

  describe('CORS', () => {
    it('should reject requests from untrusted origins', async () => {
      const response = await request(app)
        .get('/api/health')
        .set('Origin', 'https://untrusted.com');

      expect(response.headers['access-control-allow-origin']).toBeUndefined();
    });

    it('should allow requests from trusted origins', async () => {
      const response = await request(app)
        .get('/api/health')
        .set('Origin', 'https://skycoin4444.com');

      expect(response.headers['access-control-allow-origin']).toBe('https://skycoin4444.com');
    });
  });
});
```

---

## 6. Test Coverage

### Generate Coverage Report

```bash
# Generate coverage report
pnpm test:coverage

# Generate HTML coverage report
pnpm test:coverage -- --reporter=html

# View coverage report
open coverage/index.html
```

### Coverage Targets

| Category | Target |
|----------|--------|
| Statements | >80% |
| Branches | >75% |
| Functions | >80% |
| Lines | >80% |

---

## 7. Continuous Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: skycoin_test
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 11.9.0

      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'pnpm'

      - run: pnpm install

      - run: pnpm lint

      - run: pnpm type-check

      - run: pnpm test

      - run: pnpm test:integration

      - run: pnpm audit

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

---

## Best Practices

✅ **DO:**
- Write tests before code (TDD)
- Test edge cases and error paths
- Use descriptive test names
- Keep tests isolated and independent
- Mock external dependencies
- Test security vulnerabilities
- Maintain >80% code coverage
- Run tests before committing

❌ **DON'T:**
- Skip tests for "simple" code
- Test implementation details
- Create flaky tests
- Ignore test failures
- Hardcode test data
- Test multiple concerns in one test
- Skip security tests

---

## Support

For testing questions, contact: testing@skycoin4444.com
