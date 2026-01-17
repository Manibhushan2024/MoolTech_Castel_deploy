#!/bin/bash

# CastleElevator - Google Cloud Run Deployment Script
# This script automates the deployment to Google Cloud Run

set -e

echo "🚀 CastleElevator Google Cloud Run Deployment"
echo "=============================================="
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI not found. Install it first:"
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker not found. Install it first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Set variables
PROJECT_ID="${1:-urban-email-automation}"
SERVICE_NAME="castleelevator"
REGION="europe-west1"
IMAGE_NAME="castleelevator"

echo "📋 Configuration:"
echo "   Project ID: $PROJECT_ID"
echo "   Service: $SERVICE_NAME"
echo "   Region: $REGION"
echo "   Image: $IMAGE_NAME"
echo ""

# Step 1: Check environment variables
echo "🔍 Checking environment variables..."
if [ ! -f ".env.production.local" ]; then
    echo "⚠️  .env.production.local not found!"
    echo "   Creating from .env.example..."
    cp .env.example .env.production.local
    echo "   ⚠️  Please edit .env.production.local with your actual values!"
    exit 1
fi

# Step 2: Build Docker image
echo ""
echo "🔨 Building Docker image..."
docker build -t $IMAGE_NAME:latest .
if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully"
else
    echo "❌ Docker build failed"
    exit 1
fi

# Step 3: Test Docker image locally (optional)
echo ""
echo "🧪 Testing Docker image locally..."
docker run --rm -p 3000:3000 --env-file .env.production.local $IMAGE_NAME:latest &
DOCKER_PID=$!
sleep 10

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Docker image is working correctly"
else
    echo "⚠️  Could not verify local container (might be slow to start)"
fi

kill $DOCKER_PID 2>/dev/null || true
sleep 2

# Step 4: Set Google Cloud Project
echo ""
echo "📦 Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Step 5: Deploy to Cloud Run
echo ""
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --source . \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 512Mi \
    --cpu 1 \
    --timeout 3600 \
    --max-instances 100

# Step 6: Get service URL
echo ""
echo "✅ Deployment Complete!"
echo ""
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')
echo "🌐 Your application is available at:"
echo "   $SERVICE_URL"
echo ""

# Step 7: Instructions for setting environment variables
echo "📝 Next steps:"
echo "   1. Go to Cloud Run Services"
echo "   2. Click on $SERVICE_NAME"
echo "   3. Edit & Deploy"
echo "   4. Add environment variables from .env.production.local"
echo ""
echo "   Or use this command:"
echo "   gcloud run services update $SERVICE_NAME --region $REGION \\"
echo "       --set-env-vars MONGODB_URI=your_uri,RESEND_API_KEY=your_key"
echo ""

echo "💾 Useful commands:"
echo "   View logs:     gcloud run services logs read $SERVICE_NAME --region $REGION"
echo "   Update vars:   gcloud run services update $SERVICE_NAME --region $REGION --set-env-vars KEY=VALUE"
echo "   Delete:        gcloud run services delete $SERVICE_NAME --region $REGION"
echo ""
echo "🎉 Deployment script completed!"
