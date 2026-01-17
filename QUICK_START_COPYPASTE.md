# 🚀 COPY-PASTE QUICK START - GitHub + Cloud Run Deployment

## Everything You Need (Step by Step)

---

## COPY & PASTE SECTION 1: Google Cloud Setup

### 1️⃣ CREATE SERVICE ACCOUNT

Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=urban-email-automation

1. Click **+ CREATE SERVICE ACCOUNT**
2. Service account name: `github-deploy`
3. Click **CREATE AND CONTINUE**
4. Click **CONTINUE** (no additional permissions yet)
5. Click **CREATE KEY** → **JSON**
   - A file downloads automatically
   - **SAVE THIS FILE** somewhere safe!

---

### 2️⃣ ADD PERMISSIONS TO SERVICE ACCOUNT

1. Go back to: https://console.cloud.google.com/iam-admin/iam?project=urban-email-automation
2. Find the member: `github-deploy@urban-email-automation.iam.gserviceaccount.com`
3. Click it to edit
4. Click **+ ADD ANOTHER ROLE**
5. Search and add: **Cloud Run Admin**
6. Search and add: **Artifact Registry Administrator**
7. Search and add: **Service Account User**
8. Click **SAVE**

---

### 3️⃣ ADD GITHUB SECRET

Go to: https://github.com/Manibhushan2024/NextJS_CES/settings/secrets/actions

1. Click **New repository secret**
2. Name: `GCP_SA_KEY`
3. Value:
   - Open the JSON file you downloaded
   - Copy **ALL the content inside** (it's a long JSON)
   - Paste it in the "Value" field
4. Click **Add secret**

---

## COPY & PASTE SECTION 2: Create GitHub Actions Workflow

1. Go to your repository: https://github.com/Manibhushan2024/NextJS_CES
2. Click **Add file** → **Create new file**
3. File path: `.github/workflows/deploy-cloud-run.yml`
4. Paste this entire content:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout Code
      uses: actions/checkout@v4
    
    - name: Set up Cloud SDK
      uses: google-github-actions/setup-gcloud@v1
      with:
        service_account_key: ${{ secrets.GCP_SA_KEY }}
        project_id: urban-email-automation
        export_default_credentials: true
    
    - name: Configure Docker for GCR
      run: gcloud auth configure-docker gcr.io
    
    - name: Build and Push Docker Image
      run: |
        docker build -t gcr.io/urban-email-automation/castleelevator:latest .
        docker push gcr.io/urban-email-automation/castleelevator:latest
    
    - name: Deploy to Cloud Run
      run: |
        gcloud run deploy castleelevator \
          --image gcr.io/urban-email-automation/castleelevator:latest \
          --region europe-west1 \
          --platform managed \
          --allow-unauthenticated \
          --memory 512Mi \
          --cpu 1 \
          --timeout 3600 \
          --max-instances 100 \
          --set-env-vars "NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1" \
          --project urban-email-automation
    
    - name: Get Service URL
      run: |
        SERVICE_URL=$(gcloud run services describe castleelevator --region europe-west1 --format 'value(status.url)' --project urban-email-automation)
        echo "✅ Service deployed at: $SERVICE_URL"
```

5. Click **Commit changes**
6. Write commit message: `add cloud run deployment workflow`
7. Click **Commit changes**

---

## 🎯 WHAT HAPPENS NEXT

1. **GitHub detects the commit** → Automatically triggers workflow
2. **GitHub builds the Docker image** (uses Google Cloud's builder, so NO LOCAL TIMEOUT!)
3. **Pushes to Google Cloud** 
4. **Deploys to Cloud Run**
5. **You get a live URL** ✅

**Check progress:** https://github.com/Manibhushan2024/NextJS_CES/actions

⏳ **WAIT 5-10 MINUTES** for deployment

---

## COPY & PASTE SECTION 3: Get Your Live URL

After deployment completes (check Actions tab):

Go to: https://console.cloud.google.com/run?project=urban-email-automation

1. Click service: **castleelevator**
2. Copy the **Service URL** (looks like):
   ```
   https://castleelevator-xxxxx.europe-west1.run.app
   ```
3. **SAVE THIS URL**

Test it in browser - you should see your website live! ✅

---

## COPY & PASTE SECTION 4: Connect GoDaddy Domain

### In Google Cloud Console:

1. Go to: https://console.cloud.google.com/run?project=urban-email-automation
2. Click service: **castleelevator**
3. At the top, click **MANAGE CUSTOM DOMAINS**
4. Click **+ ADD MAPPING**
5. Domain: `castelelevator.com`
6. Click **CONTINUE**
7. Google shows DNS records - **COPY THE CNAME RECORD**

Example you'll see:
```
Type: CNAME
Name: www (or similar)
Value: ghs.googleusercontent.com (or similar)
```

### In GoDaddy:

1. Go to: https://dcc.godaddy.com/manage/castelelevator.com/dns
2. Find **DNS RECORDS** section
3. Look for existing CNAME record for `www`
4. Update (or add new):
   - **Type:** CNAME
   - **Name:** www
   - **Value:** (copy from Google Cloud)
5. Click **Save**
6. Also add root domain (`@`) if needed - see Google's instructions

---

## COPY & PASTE SECTION 5: Test Everything

1. **Check GitHub Actions:** https://github.com/Manibhushan2024/NextJS_CES/actions
   - Should show ✅ green check (deployment complete)

2. **Check Cloud Run:** https://console.cloud.google.com/run?project=urban-email-automation
   - Service should show **Running** status

3. **Test Domain:** Open browser and visit:
   - `https://castelelevator.com`
   - Should load your website!

4. **Test Features:**
   - ✅ Navigation works
   - ✅ Images load
   - ✅ Theme toggle (light/dark)
   - ✅ Contact form appears

---

## ⏱️ COMPLETE TIMELINE

| Step | Time | What Happens |
|------|------|-------------|
| 1-3 | 15 min | Setup Google Cloud (one-time only) |
| 4 | 1 min | Create GitHub workflow file |
| Automatic | 5-10 min | GitHub auto-builds and deploys |
| 5 | 2 min | Get your live URL |
| 6 | 5 min | Connect GoDaddy domain |
| DNS | 5-30 min | Domain propagates |
| **TOTAL** | **30-60 min** | **🎉 LIVE!** |

---

## 🆘 TROUBLESHOOTING

### Workflow Failed?
1. Check: https://github.com/Manibhushan2024/NextJS_CES/actions
2. Click failed workflow
3. Expand job logs
4. Look for error message
5. Common fixes:
   - `GCP_SA_KEY` not added → Add it in Settings → Secrets
   - Wrong project ID → Change to: `urban-email-automation`
   - Dockerfile missing → Ensure in root directory (already done ✅)

### Domain Shows Error?
1. DNS takes 5-30 minutes
2. Clear browser cache: `Ctrl + Shift + Delete`
3. Try incognito: `Ctrl + Shift + N`
4. Verify CNAME record exact match in GoDaddy

### Service Not Responding?
1. Check Cloud Run logs: https://console.cloud.google.com/run?project=urban-email-automation
2. Click castleelevator service
3. Click **LOGS** tab
4. Look for errors

---

## ✨ WHAT YOU GET

✅ Automatic deployment from any GitHub push to `main`
✅ Zero local Docker issues
✅ Live site at castelelevator.com with HTTPS
✅ Auto-scaling (free tier: up to 2M requests/month)
✅ Production-grade infrastructure
✅ Future-ready for database + email integration

---

## 📋 FINAL CHECKLIST

- [ ] Created service account in Google Cloud
- [ ] Downloaded JSON key file
- [ ] Added `GCP_SA_KEY` secret to GitHub
- [ ] Created `.github/workflows/deploy-cloud-run.yml` file
- [ ] Committed workflow file to main branch
- [ ] GitHub Actions workflow completed ✅
- [ ] Got service URL from Cloud Run
- [ ] Added CNAME record in GoDaddy DNS
- [ ] Domain is live at castelelevator.com ✅

---

**🚀 Ready to deploy? Start with Google Cloud Setup section above!**

Need help? Check troubleshooting or share the error from GitHub Actions.
