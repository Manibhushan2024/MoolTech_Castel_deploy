@echo off
REM CastleElevator - Google Cloud Run Deployment Script (Windows)
REM This script automates the deployment to Google Cloud Run

setlocal enabledelayedexpansion

echo.
echo ========================================
echo CastleElevator - Google Cloud Deployment
echo ========================================
echo.

REM Check if gcloud is installed
where gcloud >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: gcloud CLI not found.
    echo Install it from: https://cloud.google.com/sdk/docs/install
    exit /b 1
)

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Docker not found.
    echo Install it from: https://docs.docker.com/get-docker/
    exit /b 1
)

REM Set variables
set PROJECT_ID=urban-email-automation
set SERVICE_NAME=castleelevator
set REGION=europe-west1
set IMAGE_NAME=castleelevator

echo Configuration:
echo   Project ID: %PROJECT_ID%
echo   Service: %SERVICE_NAME%
echo   Region: %REGION%
echo   Image: %IMAGE_NAME%
echo.

REM Check environment file
if not exist ".env.production.local" (
    echo Warning: .env.production.local not found!
    echo Creating from .env.example...
    copy .env.example .env.production.local
    echo Please edit .env.production.local with your values!
    exit /b 1
)

REM Build Docker image
echo Building Docker image...
docker build -t %IMAGE_NAME%:latest .
if %ERRORLEVEL% NEQ 0 (
    echo Docker build failed!
    exit /b 1
)
echo Docker image built successfully!
echo.

REM Set Google Cloud Project
echo Setting Google Cloud project...
gcloud config set project %PROJECT_ID%
echo.

REM Deploy to Cloud Run
echo Deploying to Cloud Run...
gcloud run deploy %SERVICE_NAME% ^
    --source . ^
    --platform managed ^
    --region %REGION% ^
    --allow-unauthenticated ^
    --memory 512Mi ^
    --cpu 1 ^
    --timeout 3600 ^
    --max-instances 100

if %ERRORLEVEL% NEQ 0 (
    echo Deployment failed!
    exit /b 1
)

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.

REM Get service URL
for /f %%i in ('gcloud run services describe %SERVICE_NAME% --region %REGION% --format "value(status.url)"') do set SERVICE_URL=%%i
echo Your application is available at:
echo   %SERVICE_URL%
echo.

echo Next steps:
echo   1. Go to Cloud Run Console
echo   2. Click on %SERVICE_NAME%
echo   3. Edit ^& Deploy
echo   4. Add environment variables from .env.production.local
echo.

echo Useful commands:
echo   View logs:     gcloud run services logs read %SERVICE_NAME% --region %REGION%
echo   Update vars:   gcloud run services update %SERVICE_NAME% --region %REGION% --set-env-vars KEY=VALUE
echo   Delete:        gcloud run services delete %SERVICE_NAME% --region %REGION%
echo.

pause
