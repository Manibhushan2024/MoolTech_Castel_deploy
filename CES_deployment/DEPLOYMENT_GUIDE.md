# CastleElevator - Google Cloud Deployment

This is the production-ready deployment package for CastleElevator Next.js application.

## 📋 Contents

```
CES_deployment/
├── Dockerfile                 # Multi-stage Docker build (production)
├── docker-compose.yml         # Local Docker Compose setup
├── app.yaml                   # Google App Engine configuration
├── .env.example              # Environment variables template
├── package.json              # Dependencies
├── next.config.ts            # Next.js configuration
├── src/                      # Source code
├── public/                   # Static assets & images
├── .github/workflows/        # CI/CD pipelines
│   ├── deploy-gcloud.yml     # Cloud Build trigger
│   └── ci-cd.yml             # GitHub Actions
└── DEPLOYMENT_GUIDE.md       # Detailed deployment instructions
```

## 🚀 Quick Start - Google Cloud Deployment Options

### **Option 1: Google Cloud Run (Recommended for Next.js)**

```bash
# 1. Navigate to this folder
cd CES_deployment

# 2. Create .env.production.local from .env.example
cp .env.example .env.production.local
# Edit and add your actual values

# 3. Build and deploy to Cloud Run
gcloud run deploy castleelevator \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI=your_mongodb_uri,RESEND_API_KEY=your_key

# 4. Deployment complete!
# Your app will be available at the provided Cloud Run URL
```

### **Option 2: Google App Engine (Alternative)**

```bash
# Already configured in app.yaml
gcloud app deploy
```

### **Option 3: Cloud Build with GitHub Trigger (Recommended for CI/CD)**

**Already configured in `.github/workflows/deploy-gcloud.yml`**

## 🔑 Environment Variables Required

Before deploying, set these in Cloud Run environment:

```env
MONGODB_URI=mongodb+srv://...
RESEND_API_KEY=re_...
ADMIN_EMAIL=admin@castleelevator.com
SUPPORT_EMAIL=support@castleelevator.com
NEXT_PUBLIC_APP_URL=https://your-cloud-run-url
NEXT_PUBLIC_API_URL=https://your-cloud-run-url/api
```

## 📦 Local Testing Before Deployment

```bash
# 1. Build Docker image locally
docker build -t castleelevator:latest .

# 2. Run locally
docker run -p 3000:3000 \
  -e MONGODB_URI=your_mongodb \
  -e RESEND_API_KEY=your_key \
  castleelevator:latest

# 3. Test at http://localhost:3000
```

## 🏗️ Deployment Architecture

```
┌─────────────────────────────────────────┐
│  GitHub Repository (NextJS_CES)         │
│  └─> Push to main branch                │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  Cloud Build Trigger (Automated)        │
│  └─> Reads Dockerfile                   │
│  └─> Builds Docker Image               │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  Artifact Registry (Container Storage)  │
│  └─> Stores Docker image               │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  Cloud Run (Serverless Container)       │
│  └─> Auto-scales based on traffic      │
│  └─> URL: https://castleelevator-...   │
│  └─> Connected to MongoDB              │
└─────────────────────────────────────────┘
```

## ✅ Pre-Deployment Checklist

- [ ] Dockerfile is in root directory (✓ included)
- [ ] All environment variables configured in Cloud Run
- [ ] MongoDB connection string verified
- [ ] Email service keys (Resend) added
- [ ] Image built and tested locally
- [ ] GitHub trigger setup complete
- [ ] Cloud Run quotas sufficient (default: 100 concurrent requests)

## 🔗 Useful Google Cloud Commands

```bash
# View deployment logs
gcloud run services describe castleelevator --region europe-west1

# View logs in real-time
gcloud run services logs read castleelevator --region europe-west1 --limit 50 --follow

# Update environment variables
gcloud run services update castleelevator --region europe-west1 \
  --set-env-vars KEY=value

# Delete service
gcloud run services delete castleelevator --region europe-west1
```

## 🐛 Troubleshooting

**Issue: Container won't start**
- Check environment variables are set
- Verify MongoDB connection string
- Check logs: `gcloud run services logs read castleelevator`

**Issue: Timeout errors**
- Increase startup time in Cloud Run settings
- Check database connectivity
- Verify API keys are correct

**Issue: 502 Bad Gateway**
- Application crashed
- Check memory allocation (default 512MB should be enough)
- Increase to 1GB if needed

## 📞 Support & Monitoring

- **Logs**: Cloud Console → Cloud Run → Logs
- **Metrics**: Cloud Console → Monitoring
- **Costs**: Cloud Console → Billing

## 🔄 Update & Redeployment

After making code changes:

```bash
# 1. Commit and push to main
git add .
git commit -m "Update: description"
git push origin main

# 2. Cloud Build automatically triggers
# 3. View deployment status in Cloud Build History

# Or manually trigger:
gcloud run deploy castleelevator --source . --platform managed --region europe-west1
```

---

**Ready to deploy? Start with Option 1 (Cloud Run) - it's the most scalable and cost-effective for Next.js!** 🚀
