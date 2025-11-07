# AWS Infrastructure Setup - TrustMe

**Date Created:** November 7, 2025
**AWS Region:** us-east-2 (Ohio)
**AWS Account ID:** 387867038321

---

## 📊 Overview

Complete AWS infrastructure for TrustMe production environment, including database, file storage, and CDN.

---

## 🗄️ AWS RDS - PostgreSQL Database

### Database Details
- **Service:** Amazon RDS
- **Engine:** PostgreSQL 17.6
- **Instance Type:** db.t4g.micro (free tier)
  - Will upgrade to db.t4g.small before launch
- **Database Name:** trustme_production
- **Endpoint:** trustme-db-production.cxck02yw0v4a.us-east-2.rds.amazonaws.com
- **Port:** 5432

### Credentials
- **Master Username:** trustmeadmin
- **Master Password:** [REDACTED] ⚠️ (stored securely in .env.production)

### Configuration
- **Storage:** 20 GB gp3 (SSD)
- **Autoscaling:** Enabled (max 100 GB)
- **Backup Retention:** 1 day
- **Multi-AZ:** Disabled (cost optimization)
- **Public Access:** Yes (for development access)
- **Encryption:** SSL/TLS required for all connections

### Security Group
- **Name:** trustme-rds-sg
- **Inbound Rules:**
  - Type: PostgreSQL
  - Port: 5432
  - Source: Your IP (68.65.166.62/32)

### Connection String
```
postgresql://trustmeadmin:[REDACTED]@trustme-db-production.cxck02yw0v4a.us-east-2.rds.amazonaws.com:5432/trustme_production
```
(Full connection string stored in `.env.production`)

### Tables Created
- users
- profiles
- user_verifications
- sessions

---

## 📦 AWS S3 - File Storage

### Bucket Details
- **Bucket Name:** trustme-uploads-production
- **Region:** us-east-2 (Ohio)
- **Purpose:** Store user uploads (profile photos, portfolio images, chat media)

### Configuration
- **Public Access:** Enabled (read-only for uploaded files)
- **Encryption:** SSE-S3 (Amazon S3 managed keys)
- **Versioning:** Disabled
- **Object Ownership:** ACLs disabled

### Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::trustme-uploads-production/*"
    }
  ]
}
```

### CORS Configuration
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": [
      "http://localhost:5173",
      "https://trustme.mx"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

---

## 🌐 AWS CloudFront - CDN

### Distribution Details
- **Distribution Domain:** d2v5hpvkahmvq5.cloudfront.net
- **Distribution ID:** EV5VNSVH1DVJU
- **Origin:** trustme-uploads-production.s3.us-east-2.amazonaws.com
- **Status:** Deploying (5-10 minutes)

### Configuration
- **Price Class:** Use only North America and Europe
- **HTTPS:** Enabled (redirect HTTP to HTTPS)
- **Cache Policy:** CachingOptimized
- **WAF:** Disabled (cost optimization)

### Purpose
- Fast global content delivery
- HTTPS for all uploaded files
- Reduced S3 bandwidth costs
- Improved user experience

### Usage
Files uploaded to S3 can be accessed via:
- **Direct S3 URL:** `https://trustme-uploads-production.s3.us-east-2.amazonaws.com/path/to/file.jpg`
- **CloudFront URL (preferred):** `https://d2v5hpvkahmvq5.cloudfront.net/path/to/file.jpg`

---

## 🔐 IAM - Access Management

### IAM User: trustme-backend-s3
- **Purpose:** Backend application access to S3
- **Permissions:** AmazonS3FullAccess
- **Access Key ID:** [REDACTED] ⚠️ (stored securely in .env files)
- **Secret Access Key:** [REDACTED] ⚠️ (stored securely in .env files)

### Security Notes
- ⚠️ Credentials are stored in `.env` and `.env.production` files
- ⚠️ These files are in `.gitignore` and never committed to git
- 🔒 GitHub push protection enabled to prevent accidental exposure
- 📝 Consider rotating keys periodically for security

---

## 💰 Cost Breakdown

### Current Costs (Free Tier)
- **RDS db.t4g.micro:** $0/month (free tier - 750 hours/month)
- **RDS Storage 20 GB:** $0/month (free tier - 20 GB/month)
- **S3 Storage:** $0/month (free tier - 5 GB/month)
- **S3 Requests:** $0/month (free tier - 20,000 GET, 2,000 PUT)
- **CloudFront:** $0/month (free tier - 1 TB data transfer)
- **Total:** $0/month (during free tier)

### Estimated Costs After Free Tier / At Scale
- **RDS db.t4g.small:** ~$25-30/month
- **RDS Storage 100 GB:** ~$10/month
- **S3 Storage 50 GB:** ~$1.15/month
- **S3 Requests:** ~$1-5/month
- **CloudFront:** ~$10-20/month (1-2 TB transfer)
- **Total:** ~$47-66/month (estimated production costs)

### Cost Optimization
- ✅ Using free tier during development (saves ~$50/month for 4 weeks)
- ✅ Will upgrade RDS to db.t4g.small before launch
- ✅ CloudFront reduces S3 bandwidth costs
- ✅ No WAF ($14/month saved, can add later if needed)

---

## 🚀 Next Steps

### Before Launch
1. **Upgrade RDS Instance:**
   - From db.t4g.micro → db.t4g.small
   - More memory and CPU for production traffic

2. **Configure Custom Domain for CloudFront:**
   - Set up trustme.mx domain
   - Add SSL certificate via AWS Certificate Manager
   - Update CloudFront alternate domain names

3. **Enable Database Backups:**
   - Increase backup retention (7-30 days)
   - Set up automated snapshots
   - Test restore procedures

4. **Set Up Monitoring:**
   - CloudWatch alarms for database CPU, storage, connections
   - S3 bucket metrics and alerts
   - CloudFront monitoring

5. **Security Hardening:**
   - Restrict RDS security group to production server IPs only
   - Rotate IAM access keys
   - Enable CloudTrail for audit logging
   - Consider enabling WAF for CloudFront

6. **Production Secrets:**
   - Generate new JWT secret (replace placeholder)
   - Add production Stripe keys
   - Add production Twilio SendGrid API key
   - Add production Twilio Verify credentials

---

## 📝 Environment Variables

All AWS configuration is stored in `.env` (development) and `.env.production` (production):

```bash
# AWS Configuration
AWS_ACCESS_KEY_ID=[REDACTED]
AWS_SECRET_ACCESS_KEY=[REDACTED]
AWS_REGION=us-east-2
AWS_S3_BUCKET=trustme-uploads-production
AWS_CLOUDFRONT_DOMAIN=d2v5hpvkahmvq5.cloudfront.net
```

⚠️ **Security:**
- Actual credentials stored in `.env` and `.env.production` files
- These files are never committed to git (protected by `.gitignore`)
- GitHub push protection enabled to prevent accidental exposure

---

## 🔧 Maintenance Commands

### Check RDS Connection
```bash
PGPASSWORD='[REDACTED]' psql -h trustme-db-production.cxck02yw0v4a.us-east-2.rds.amazonaws.com -U trustmeadmin -d trustme_production
```
(Replace `[REDACTED]` with actual password from `.env.production`)

### Run Production Migrations
```bash
cd backend
npx tsx src/db/migrate-production.ts
```

### Test S3 Upload (AWS CLI)
```bash
aws s3 cp test.jpg s3://trustme-uploads-production/test.jpg
```

### Invalidate CloudFront Cache
```bash
aws cloudfront create-invalidation --distribution-id EV5VNSVH1DVJU --paths "/*"
```

---

## 📚 Reference Links

- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/)
- [PostgreSQL 17 Release Notes](https://www.postgresql.org/docs/17/release-17.html)

---

**Status:** ✅ All infrastructure configured and ready for development
**Last Updated:** November 7, 2025
