# 🚀 CastleElevator Deployment Checklist

## Pre-Deployment (5 min)

- [ ] Extract `CES_deployment` folder
- [ ] Open terminal in this folder
- [ ] Create `.env.production.local` from `.env.example`
- [ ] Fill in all required environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `RESEND_API_KEY`
  - [ ] `ADMIN_EMAIL`
  - [ ] `SUPPORT_EMAIL`

## Google Cloud Setup (10 min)

- [ ] Create Google Cloud Account (https://cloud.google.com)
- [ ] Create a new project
- [ ] Enable these APIs:
  - [ ] Cloud Run API
  - [ ] Artifact Registry API
  - [ ] Cloud Build API
- [ ] Install gcloud CLI
- [ ] Install Docker
- [ ] Authenticate: `gcloud auth login`
- [ ] Set project: `gcloud config set project YOUR_PROJECT_ID`

## Local Testing (5 min)

- [ ] Build Docker image: `docker build -t castleelevator:latest .`
- [ ] Run locally: `docker run -p 3000:3000 --env-file .env.production.local castleelevator:latest`
- [ ] Test at: `http://localhost:3000`
- [ ] Verify contact form works
- [ ] Stop container: `Ctrl+C`

## Deployment (2-5 min)

### Option A: Automated Script (Easiest)
- [ ] Linux/Mac: `./deploy.sh`
- [ ] Windows: `deploy.bat`
- [ ] Wait for deployment to complete

### Option B: Manual
```bash
gcloud run deploy castleelevator \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

## Post-Deployment (5 min)

- [ ] Copy service URL from deployment output
- [ ] Set environment variables:
```bash
gcloud run services update castleelevator \
  --region europe-west1 \
  --set-env-vars MONGODB_URI=your_uri,RESEND_API_KEY=your_key
```
- [ ] Visit deployed URL and test the app
- [ ] Verify contact form sends emails
- [ ] Check logs: `gcloud run services logs read castleelevator`

## Monitoring

- [ ] Set up Cloud Run monitoring
- [ ] Enable error notifications
- [ ] Save service URL for reference

---

## 📝 Important Notes

✅ **Total time: ~30 minutes first deployment**

✅ **All required files are included in this folder**

✅ **No additional configuration needed beyond .env.production.local**

✅ **App will auto-scale with traffic**

✅ **Pricing: Free tier covers first 2M requests/month**

---

## 🆘 If Something Goes Wrong

1. Check logs: `gcloud run services logs read castleelevator`
2. Verify environment variables are set
3. Test Docker locally first
4. Check MongoDB connection
5. Ensure RESEND_API_KEY is valid

---

**Need help? See README.md or DEPLOYMENT_GUIDE.md**

**Current Status:** ✅ Ready to Deploy
