# CastleElevator Deployment Package

This folder contains everything needed to deploy the CastleElevator Next.js application to Google Cloud.

## 📦 What's Included?

```
CES_deployment/
├── Dockerfile                      # Production Docker build
├── docker-compose.yml              # Local Docker Compose
├── app.yaml                        # App Engine config (alternative)
├── package.json                    # Dependencies
├── src/                            # Application source code
├── public/                         # Static assets & images
├── .github/workflows/              # CI/CD pipelines
│   ├── deploy-gcloud.yml          # Automated Cloud Build
│   └── ci-cd.yml                  # GitHub Actions
├── .env.example                   # Environment template
├── deploy.sh                       # Linux/Mac deployment script
├── deploy.bat                      # Windows deployment script
├── DEPLOYMENT_GUIDE.md            # Detailed guide
└── README.md                       # This file
```

---

## 🎯 Deployment Options

### **Option A: Google Cloud Run (RECOMMENDED) ⭐**

**Best for:** Production Next.js apps, auto-scaling, serverless

**Pros:**
- ✅ Fully managed, serverless
- ✅ Auto-scales with traffic
- ✅ Pay per request (cost-effective)
- ✅ Easy to update deployments
- ✅ Built-in monitoring

**Setup Time:** 5-10 minutes

```bash
# 1. Prepare environment
cp .env.example .env.production.local
# Edit with your values

# 2. Deploy
./deploy.sh
# OR on Windows:
deploy.bat

# That's it! Your app is live.
```

---

### **Option B: Google App Engine (ALTERNATIVE)**

**Best for:** Traditional app engine approach

**Pros:**
- ✅ Flexible runtime
- ✅ App versioning
- ✅ Traffic splitting

**Setup Time:** 10-15 minutes

```bash
# app.yaml is already configured
gcloud app deploy
```

---

### **Option C: Manual Cloud Build with GitHub (CI/CD)**

**Best for:** Automatic deployments on GitHub push

**Pros:**
- ✅ Automatic on push to main branch
- ✅ Full CI/CD pipeline
- ✅ Multiple environments

**Already configured in:**
- `.github/workflows/deploy-gcloud.yml`

---

## 🚀 Quick Start (Cloud Run)

### Step 1: Prerequisites
```bash
# Install Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# Install Docker
# https://docs.docker.com/get-docker/

# Verify installations
gcloud --version
docker --version
```

### Step 2: Prepare Deployment
```bash
# Navigate to deployment folder
cd CES_deployment

# Create environment file
cp .env.example .env.production.local

# Edit with your actual credentials
nano .env.production.local
# OR on Windows:
# notepad .env.production.local
```

### Step 3: Deploy
```bash
# Option 1: Use deployment script (recommended)
./deploy.sh              # Linux/Mac
# OR
deploy.bat             # Windows

# Option 2: Manual deployment
gcloud run deploy castleelevator \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

### Step 4: Set Environment Variables
```bash
# After deployment is complete
gcloud run services update castleelevator \
  --region europe-west1 \
  --set-env-vars MONGODB_URI=your_uri,RESEND_API_KEY=your_key
```

### Step 5: Access Your App
```
https://castleelevator-xxxxx-europe-west1.a.run.app
```

---

## 📋 Environment Variables Needed

Create `.env.production.local` with these values:

```env
# ========== REQUIRED ==========

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/castleelevator

# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=admin@castleelevator.com
SUPPORT_EMAIL=support@castleelevator.com

# Application
NEXT_PUBLIC_APP_URL=https://your-cloud-run-url
NEXT_PUBLIC_API_URL=https://your-cloud-run-url/api

# ========== OPTIONAL ==========

# SMS Service (Twilio)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890

# Rate Limiting
RATE_LIMIT_REQUESTS=5
RATE_LIMIT_WINDOW_MS=3600000

# Environment
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## 🧪 Test Locally Before Deploying

```bash
# Build Docker image
docker build -t castleelevator:latest .

# Run container
docker run -p 3000:3000 \
  --env-file .env.production.local \
  castleelevator:latest

# Test
# Visit: http://localhost:3000

# Stop container
# Press Ctrl+C
```

---

## 📊 Google Cloud Platform Setup

### 1. Create GCP Account
- Go to: https://cloud.google.com
- Sign up or log in

### 2. Create Project
```bash
gcloud projects create nextjs-ces
gcloud config set project nextjs-ces
```

### 3. Enable Required APIs
```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 4. Set Default Region
```bash
gcloud config set run/region europe-west1
```

---

## 📈 Deployment Checklist

- [ ] Google Cloud account created
- [ ] Project ID set in `deploy.sh` or `deploy.bat`
- [ ] APIs enabled (Cloud Run, Artifact Registry, Cloud Build)
- [ ] `.env.production.local` created with all values
- [ ] Local Docker test passed
- [ ] Dockerfile builds without errors
- [ ] GitHub repository connected (for CI/CD)
- [ ] Cloud Run service configured with environment variables

---

## 🔍 Monitoring & Logs

### View Real-time Logs
```bash
gcloud run services logs read castleelevator --region europe-west1 --follow
```

### View Service Status
```bash
gcloud run services describe castleelevator --region europe-west1
```

### Check Metrics
- CPU usage
- Memory usage
- Request count
- Error rate

Go to: **Cloud Console** → **Cloud Run** → **Metrics**

---

## 🔄 Update & Redeploy

### After Code Changes
```bash
# 1. Push to GitHub
git add .
git commit -m "Update: description"
git push origin main

# 2. Option A - Manual redeploy
cd CES_deployment
gcloud run deploy castleelevator --source .

# 2. Option B - Automatic (if CI/CD configured)
# Cloud Build automatically triggers on push
```

---

## 💰 Cost Estimation (Google Cloud Run)

| Traffic | Monthly Cost |
|---------|-------------|
| Light (< 1M requests) | ~$0-5 |
| Medium (1-10M requests) | ~$5-50 |
| Heavy (> 10M requests) | ~$50-500 |

*Includes: Compute, Memory, Networking*

Free tier: **2 million requests/month**

---

## ⚠️ Troubleshooting

### Issue: "docker: command not found"
**Solution:** Install Docker from https://docs.docker.com/get-docker/

### Issue: "gcloud: command not found"
**Solution:** Install Google Cloud SDK from https://cloud.google.com/sdk/docs/install

### Issue: "Permission denied" on .sh file
**Solution:** 
```bash
chmod +x deploy.sh
./deploy.sh
```

### Issue: Cloud Run shows "500 error"
**Solution:** 
- Check logs: `gcloud run services logs read castleelevator`
- Verify environment variables are set
- Ensure MongoDB connection string is correct

### Issue: Timeout during deployment
**Solution:**
- Increase memory to 1GB in Cloud Run settings
- Check if Docker image builds locally first

### Issue: Image won't deploy to Artifact Registry
**Solution:**
```bash
# Configure Docker authentication
gcloud auth configure-docker europe-west1-docker.pkg.dev

# Tag image correctly
docker tag castleelevator europe-west1-docker.pkg.dev/PROJECT/castleelevator
```

---

## 🆘 Support

For detailed instructions, see: `DEPLOYMENT_GUIDE.md`

For Google Cloud help:
- Cloud Run Docs: https://cloud.google.com/run/docs
- Troubleshooting: https://cloud.google.com/run/docs/troubleshooting/general-errors

---

## ✅ Success Indicators

After deployment, you should see:

1. ✅ Cloud Run service "castleelevator" created
2. ✅ Service URL assigned (https://castleelevator-xxxxx.run.app)
3. ✅ Health check passes (green checkmark)
4. ✅ App loads at the service URL
5. ✅ Contact form works
6. ✅ Logs show no errors

---

**Ready to deploy? Start with the Quick Start section above! 🚀**
