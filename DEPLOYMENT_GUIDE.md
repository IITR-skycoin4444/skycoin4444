# SKY4444 Enterprise Platform - Deployment Guide

**Version**: 1.0.0-enterprise  
**Last Updated**: 2026-07-03

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Local Development Setup](#local-development-setup)
3. [Staging Deployment](#staging-deployment)
4. [Production Deployment](#production-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Cloud Run Deployment](#cloud-run-deployment)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Rollback Procedures](#rollback-procedures)
9. [Monitoring & Alerting](#monitoring--alerting)
10. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying to any environment, ensure:

- [ ] All tests passing: `pnpm test`
- [ ] No TypeScript errors: `pnpm type-check`
- [ ] No linting errors: `pnpm lint`
- [ ] Code formatted: `pnpm format`
- [ ] All dependencies up-to-date: `pnpm audit`
- [ ] Environment variables configured
- [ ] Database migrations prepared
- [ ] Backup created
- [ ] Deployment plan documented
- [ ] Team notified of deployment window

### Pre-Deployment Commands

```bash
# Run full test suite
pnpm test:full

# Check for security vulnerabilities
pnpm audit

# Build production bundle
pnpm build

# Verify build size
du -sh dist/

# Check for breaking changes
git log --oneline main..HEAD
```

---

## Local Development Setup

### Initial Setup

```bash
# Clone repository
git clone https://github.com/skycoin/skycoin_production.git
cd skycoin_production

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Edit .env.local with your values
nano .env.local

# Create database
mysql -u root -p < schema.sql

# Run migrations
pnpm drizzle-kit migrate
```

### Development Server

```bash
# Start development server
pnpm dev

# Server runs on http://localhost:3001
# Frontend available on http://localhost:5173

# Watch for changes
pnpm dev:watch

# Debug mode
DEBUG=* pnpm dev
```

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
pnpm test:watch

# Format and lint
pnpm format && pnpm lint

# Commit changes
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature

# Create pull request
# Wait for CI/CD to pass
# Get code review
# Merge to main
```

---

## Staging Deployment

### Staging Environment Setup

```bash
# Create staging branch
git checkout -b staging

# Configure staging environment
cp .env.example .env.staging

# Edit staging configuration
nano .env.staging

# Set staging-specific values:
# - DATABASE_URL=mysql://staging_user:password@staging-db:3306/skycoin_staging
# - NODE_ENV=staging
# - LOG_LEVEL=debug
# - RATE_LIMIT_MAX_REQUESTS=1000
```

### Deploy to Staging

```bash
# Build for staging
NODE_ENV=staging pnpm build

# Start staging server
NODE_ENV=staging pnpm start

# Or using Docker
docker build -t skycoin:staging -f Dockerfile.staging .
docker run -p 3000:3000 --env-file .env.staging skycoin:staging
```

### Staging Verification

```bash
# Health check
curl http://staging.skycoin4444.com/api/health

# Run smoke tests
pnpm test:smoke --env staging

# Load testing
pnpm test:load --env staging

# Security scan
pnpm test:security --env staging
```

---

## Production Deployment

### Production Environment Setup

```bash
# Create production branch
git checkout -b production

# Configure production environment
# Use webdev_request_secrets to set production secrets

# Verify all secrets are set
env | grep -E "DATABASE_URL|JWT_SECRET|OPENAI_API_KEY"
```

### Pre-Production Validation

```bash
# Verify production configuration
pnpm validate:config --env production

# Run full test suite
pnpm test:full

# Build production bundle
pnpm build

# Verify bundle integrity
pnpm verify:build

# Check for security issues
pnpm audit --production

# Verify database migrations
pnpm drizzle-kit check
```

### Production Deployment Steps

```bash
# 1. Create deployment tag
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0

# 2. Backup current database
mysqldump -u user -p database > backup-$(date +%Y%m%d-%H%M%S).sql

# 3. Deploy to production
# Using Cloud Run (see Cloud Run Deployment section)
# Or using Docker (see Docker Deployment section)

# 4. Run database migrations
pnpm drizzle-kit migrate --env production

# 5. Verify deployment
curl https://api.skycoin4444.com/api/health

# 6. Monitor logs
tail -f logs/production.log

# 7. Notify team
# Send deployment notification to #deployments channel
```

---

## Docker Deployment

### Build Docker Image

```bash
# Build for production
docker build -t skycoin:latest \
  --build-arg NODE_ENV=production \
  -f Dockerfile .

# Tag for registry
docker tag skycoin:latest gcr.io/skycoin-prod/skycoin:latest
docker tag skycoin:latest gcr.io/skycoin-prod/skycoin:v1.0.0

# Push to registry
docker push gcr.io/skycoin-prod/skycoin:latest
docker push gcr.io/skycoin-prod/skycoin:v1.0.0
```

### Dockerfile

```dockerfile
# Multi-stage build
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build application
RUN pnpm build

# Production image
FROM node:22-alpine

WORKDIR /app

# Install runtime dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://user:password@db:3306/skycoin
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - db
    restart: unless-stopped
    networks:
      - skycoin-network

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=skycoin
      - MYSQL_USER=${MYSQL_USER}
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
    volumes:
      - db-data:/var/lib/mysql
    restart: unless-stopped
    networks:
      - skycoin-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped
    networks:
      - skycoin-network

volumes:
  db-data:

networks:
  skycoin-network:
    driver: bridge
```

### Run Docker Container

```bash
# Run with environment file
docker run -d \
  --name skycoin-prod \
  --env-file .env.production \
  -p 3000:3000 \
  -v logs:/app/logs \
  gcr.io/skycoin-prod/skycoin:latest

# Using Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker logs -f skycoin-prod

# Stop container
docker stop skycoin-prod

# Remove container
docker rm skycoin-prod
```

---

## Cloud Run Deployment

### Prerequisites

```bash
# Install Google Cloud CLI
curl https://sdk.cloud.google.com | bash

# Authenticate
gcloud auth login

# Set project
gcloud config set project skycoin-production

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Deploy to Cloud Run

```bash
# Deploy from source
gcloud run deploy skycoin-production \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 3600 \
  --max-instances 100 \
  --set-env-vars "NODE_ENV=production,LOG_LEVEL=info" \
  --set-secrets "DATABASE_URL=database-url:latest,JWT_SECRET=jwt-secret:latest"

# Deploy from image
gcloud run deploy skycoin-production \
  --image gcr.io/skycoin-prod/skycoin:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Cloud Run Configuration

```yaml
# cloudbuild.yaml
steps:
  # Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/skycoin:$SHORT_SHA', '.']

  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/skycoin:$SHORT_SHA']

  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gke-deploy'
    args:
      - run
      - --filename=k8s/
      - --image=gcr.io/$PROJECT_ID/skycoin:$SHORT_SHA
      - --location=us-central1
      - --cluster=skycoin-prod

images:
  - 'gcr.io/$PROJECT_ID/skycoin:$SHORT_SHA'
  - 'gcr.io/$PROJECT_ID/skycoin:latest'
```

### Monitor Cloud Run

```bash
# View service details
gcloud run services describe skycoin-production --region us-central1

# View logs
gcloud run services logs read skycoin-production --region us-central1 --limit 50

# View metrics
gcloud monitoring metrics-descriptors list --filter="metric.type:run.googleapis.com/*"

# Set up alerts
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="SKY4444 High Error Rate" \
  --condition-display-name="Error rate > 5%" \
  --condition-threshold-value=0.05
```

---

## Post-Deployment Verification

### Health Checks

```bash
# API health
curl https://api.skycoin4444.com/api/health

# Database connectivity
curl https://api.skycoin4444.com/api/db-health

# Cache connectivity
curl https://api.skycoin4444.com/api/cache-health

# External service connectivity
curl https://api.skycoin4444.com/api/external-health
```

### Smoke Tests

```bash
# Run smoke tests
pnpm test:smoke --env production

# Test critical endpoints
pnpm test:critical-paths --env production

# Test user flows
pnpm test:user-flows --env production
```

### Performance Verification

```bash
# Check response times
curl -w "@curl-format.txt" https://api.skycoin4444.com/api/health

# Load test
pnpm test:load --env production --duration 5m

# Benchmark
pnpm test:benchmark --env production
```

### Security Verification

```bash
# SSL/TLS check
openssl s_client -connect api.skycoin4444.com:443

# Security headers
curl -I https://api.skycoin4444.com/

# CORS verification
curl -H "Origin: https://example.com" https://api.skycoin4444.com/
```

---

## Rollback Procedures

### Rollback to Previous Version

```bash
# 1. Identify previous version
git log --oneline | head -10

# 2. Create rollback tag
git tag rollback-$(date +%Y%m%d-%H%M%S) <commit-hash>

# 3. Revert to previous version
git revert HEAD

# 4. Deploy rolled-back version
gcloud run deploy skycoin-production \
  --image gcr.io/skycoin-prod/skycoin:previous-tag

# 5. Verify rollback
curl https://api.skycoin4444.com/api/health

# 6. Restore database if needed
mysql -u user -p database < backup-YYYYMMDD-HHMMSS.sql
```

### Database Rollback

```bash
# 1. Stop application
gcloud run services update skycoin-production --no-traffic

# 2. Restore database
mysql -u user -p database < backup-YYYYMMDD-HHMMSS.sql

# 3. Verify database integrity
pnpm drizzle-kit check

# 4. Resume application
gcloud run services update skycoin-production --traffic 100

# 5. Verify application
curl https://api.skycoin4444.com/api/health
```

---

## Monitoring & Alerting

### Setup Monitoring

```bash
# Enable Cloud Monitoring
gcloud services enable monitoring.googleapis.com

# Create dashboard
gcloud monitoring dashboards create --config-from-file=dashboard.json

# Setup alerts
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="SKY4444 Alerts"
```

### Key Metrics to Monitor

- **Response Time**: P50, P95, P99
- **Error Rate**: Errors per minute
- **Throughput**: Requests per second
- **CPU Usage**: Target <70%
- **Memory Usage**: Target <80%
- **Database Connections**: Target <80% of pool
- **Cache Hit Rate**: Target >80%
- **Uptime**: Target >99.9%

### Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Error Rate | >1% | >5% |
| Response Time (P95) | >500ms | >1000ms |
| CPU Usage | >70% | >90% |
| Memory Usage | >80% | >95% |
| Database Connections | >80% | >95% |
| Uptime | <99.5% | <99% |

---

## Troubleshooting

### Common Issues

**Issue: Application won't start**
```bash
# Check logs
docker logs skycoin-prod

# Verify environment variables
env | grep -E "DATABASE_URL|JWT_SECRET"

# Test database connection
mysql -u user -p -h host -D database

# Check port availability
lsof -i :3000
```

**Issue: High memory usage**
```bash
# Monitor memory
docker stats skycoin-prod

# Check for memory leaks
node --inspect server/_core/index.ts

# Increase memory limit
docker run -m 1g skycoin:latest
```

**Issue: Database connection errors**
```bash
# Verify connection string
echo $DATABASE_URL

# Test connection
mysql -u user -p -h host -D database

# Check connection pool
SELECT * FROM information_schema.processlist;

# Increase pool size
DB_POOL_MAX=50 pnpm start
```

**Issue: Slow response times**
```bash
# Check database queries
EXPLAIN SELECT * FROM users WHERE id = 1;

# Enable query logging
SET GLOBAL slow_query_log = 'ON';

# Check cache hit rate
redis-cli INFO stats

# Profile application
node --prof server/_core/index.ts
```

---

## Support & Escalation

- **Documentation**: See PRODUCTION_README.md
- **Issues**: GitHub Issues
- **On-call**: 24/7 support team
- **Escalation**: Slack #production-incidents

---

**Last Updated**: 2026-07-03  
**Maintained By**: Engineering Team
