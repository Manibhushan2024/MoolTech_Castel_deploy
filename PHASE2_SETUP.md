# Phase 2 — Project Setup (Repo, Structure, CI/CD Baseline)

## Overview

This document covers the Phase 2 infrastructure setup for CastleElevator, including Git workflow, CI/CD pipeline, environment variables, and base component library.

**Date**: January 1, 2026  
**Status**: ✅ Complete  
**Scope**: GitHub integration, branching strategy, automated checks, and reusable UI components

---

## 1. GitHub Repository Setup

### Repository Configuration

```bash
# Initialize Git (already done)
git init

# Configure user
git config user.name "CastleElevator Dev"
git config user.email "dev@castleelevator.com"

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Complete Next.js setup with components and pages"

# Create GitHub repo at https://github.com/yourusername/castleelevator
# Then push:
# git remote add origin https://github.com/yourusername/castleelevator.git
# git branch -M main
# git push -u origin main
```

### Repository Protection Rules

#### Main Branch (`main`)
- ✅ Require pull request reviews (2 reviewers)
- ✅ Require status checks to pass
- ✅ Require branches up to date before merging
- ✅ Dismiss stale pull request approvals
- ✅ Require code review dismissal before merge
- ✅ Restrict who can push (maintainers only)

#### Develop Branch (`develop`)
- ✅ Require pull request reviews (1 reviewer)
- ✅ Require status checks to pass
- ✅ Require branches up to date before merging

**Setup**: Repository Settings → Branches → Add rule

---

## 2. Branching Strategy (Git Flow)

### Branch Naming Convention

```
feature/user-authentication
feature/voice-recorder-optimization

bugfix/form-validation-issue
bugfix/dark-mode-flicker

hotfix/security-patch
hotfix/critical-crash

release/1.1.0
release/2.0.0
```

### Complete Workflow

See [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for detailed branch workflow.

### Quick Reference Commands

```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Push and create PR
git push origin feature/new-feature
# Create PR on GitHub with detailed description

# After merge, delete branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature

# Create release
git checkout -b release/1.1.0
# Update version in package.json
git commit -m "chore: bump version to 1.1.0"
git push origin release/1.1.0
# Create PR to main, merge, tag, merge back to develop
```

---

## 3. CI/CD Pipeline

### GitHub Actions Workflow

**File**: `.github/workflows/ci-cd.yml`

Triggers on:
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

### Pipeline Stages

#### 1. Lint & Build (Required)

```yaml
- ESLint check (max-warnings: 0)
- Prettier format validation
- TypeScript type checking
- Full Next.js build
- Unit tests with coverage
- Codecov upload (optional)
```

**Status**: Must pass to merge PR

#### 2. Deploy to Staging (Auto on develop)

```yaml
- Triggered: After lint passes on develop
- Environment: https://staging.castleelevator.com
- Notification: Slack webhook on success
```

**Setup**: Add Vercel token or your deployment secret

#### 3. Deploy to Production (Auto on main)

```yaml
- Triggered: After lint passes on main
- Environment: https://castleelevator.com
- Notification: Slack webhook on success
```

**Setup**: Add production deployment secret

### Local CI Checks

Before pushing, run locally:

```bash
npm run lint           # ESLint check
npm run format:check   # Prettier check
npm run type-check     # TypeScript check
npm run build          # Full build
```

---

## 4. Environment Variables

### Files Structure

```
.env.example          ← Template (commit to repo)
.env.local            ← Local development (gitignored)
.env.staging          ← Staging deployment (gitignored)
.env.production       ← Production deployment (gitignored)
```

### Variable Categories

#### Email Provider

```env
EMAIL_PROVIDER=sendgrid

# SendGrid
SENDGRID_API_KEY=your_key_here

# OR Nodemailer
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=app_specific_password

# Admin settings
ADMIN_EMAIL=admin@castleelevator.com
FROM_EMAIL=noreply@castleelevator.com
```

#### File Storage

```env
STORAGE_PROVIDER=r2

# Cloudflare R2
R2_ACCOUNT_ID=xxxx
R2_ACCESS_KEY_ID=xxxx
R2_SECRET_ACCESS_KEY=xxxx
R2_BUCKET_NAME=castleelevator-files
R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com

# OR AWS S3
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
AWS_S3_BUCKET=castleelevator-files
```

#### Security (CAPTCHA)

```env
CAPTCHA_ENABLED=true

# reCAPTCHA v3 (recommended)
RECAPTCHA_SITE_KEY=6LeIx...
RECAPTCHA_SECRET_KEY=6LeIx...

# OR hCaptcha
HCAPTCHA_SITE_KEY=xxxx
HCAPTCHA_SECRET_KEY=xxxx
```

#### App Configuration

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Setup Instructions

```bash
# 1. Copy template
cp .env.example .env.local

# 2. Fill in your values
nano .env.local

# 3. Use in code
process.env.SENDGRID_API_KEY  // Access in API routes
process.env.NEXT_PUBLIC_API_URL  // Access in client
```

### GitHub Secrets

For CI/CD deployment, set secrets:

```
GitHub → Settings → Secrets → New repository secret

SENDGRID_API_KEY
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
RECAPTCHA_SECRET_KEY
VERCEL_TOKEN (if using Vercel)
SLACK_WEBHOOK_URL
```

---

## 5. Pre-commit Hooks (Husky)

### Installation

```bash
npm install husky --save-dev
npx husky install
```

### Hooks Configured

#### pre-commit Hook

**Runs on**: `git commit`  
**Actions**:
- Auto-fix linting issues (`eslint . --fix`)
- Auto-format code (`prettier --write src`)

```bash
npm run lint:fix
npm run format
```

#### pre-push Hook

**Runs on**: `git push`  
**Actions**:
- Lint check (fail if errors)
- Type check (fail if type errors)
- Full build (fail if build fails)

```bash
npm run lint
npm run type-check
npm run build
```

### Skip Hooks (Emergency Only)

```bash
git commit --no-verify
git push --no-verify
```

---

## 6. Code Quality Standards

### ESLint Configuration

**Config**: `eslint.config.mjs`

- Extends: `eslint-config-next`
- Rules: Enforces best practices
- Max warnings: 0 (all warnings treated as errors)

### Prettier Configuration

**Config**: `.prettierrc`

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

### TypeScript Strict Mode

**Config**: `tsconfig.json`

- `strict: true` - Enforces type safety
- `noImplicitAny: true` - No implicit any types
- `strictNullChecks: true` - Strict null handling

---

## 7. Base Component Library

### UI Components Created

Located in `src/components/ui/`

#### Button Component

```tsx
import { Button } from "@/components/ui/Button"

export default function Example() {
  return (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button isLoading>Loading...</Button>
    </>
  )
}
```

**Props**:
- `variant`: primary | secondary | danger | outline
- `size`: sm | md | lg
- `isLoading`: boolean
- `disabled`: boolean

#### Card Components

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card"

export default function Example() {
  return (
    <Card>
      <CardHeader>Header Title</CardHeader>
      <CardBody>Card content here</CardBody>
      <CardFooter>Footer action</CardFooter>
    </Card>
  )
}
```

#### Form Components

```tsx
import { Input, Select, TextArea } from "@/components/ui/index"

export default function Example() {
  return (
    <>
      <Input label="Name" placeholder="John Doe" />
      <Input type="email" label="Email" error="Invalid email" />
      <Select
        label="Service Type"
        options={[
          { value: "install", label: "Installation" },
          { value: "maintain", label: "Maintenance" },
        ]}
      />
      <TextArea label="Message" rows={5} />
    </>
  )
}
```

#### Alert Component

```tsx
import { Alert } from "@/components/ui/Alert"

export default function Example() {
  return (
    <>
      <Alert type="success" title="Success" message="Operation completed" />
      <Alert type="error" title="Error" message="Something went wrong" />
      <Alert type="warning" message="Please review before proceeding" />
      <Alert type="info" message="This is informational" />
    </>
  )
}
```

#### Badge Component

```tsx
import { Badge } from "@/components/ui/Badge"

export default function Example() {
  return (
    <>
      <Badge variant="primary">Premium</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="danger" size="sm">
        Critical
      </Badge>
    </>
  )
}
```

### Component Features

- ✅ TypeScript with full type safety
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Accessibility attributes
- ✅ Error states
- ✅ Loading states
- ✅ Customizable via className prop
- ✅ Barrel exports for clean imports

### Using Component Library

```tsx
// Clean import from barrel export
import { Button, Card, CardBody, Input, Alert } from "@/components/ui"

export default function Page() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  return (
    <Card>
      <CardBody>
        <Input label="Email" type="email" />
        <Button onClick={() => setStatus("success")}>Submit</Button>
        {status === "success" && (
          <Alert type="success" message="Form submitted!" />
        )}
      </CardBody>
    </Card>
  )
}
```

---

## 8. Development Workflow

### Daily Development

```bash
# Morning: Start fresh
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature

# Make changes, commit frequently
git add .
git commit -m "feat: add new feature"

# Before pushing, run checks
npm run lint:fix
npm run format
npm run type-check
npm run build

# Push to create PR
git push origin feature/your-feature
```

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] TypeScript types are correct
- [ ] No console.log() left in code
- [ ] Error handling implemented
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Accessibility considered
- [ ] Mobile responsive
- [ ] Dark mode compatible

### Merging to Main

```bash
# Only from release branches or hotfixes
# Must have 2 approvals
# Must pass all CI checks
# Tag with version

git tag v1.1.0
git push origin v1.1.0
```

---

## 9. Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to staging
vercel --prod=false

# Deploy to production
vercel --prod
```

### Manual Deployment

```bash
# Build
npm run build

# Start production server
npm run start

# Server runs on port 3000
```

### Environment Setup by Stage

**Development**
```
URL: http://localhost:3000
.env.local - local settings
Auto-reload on code change
```

**Staging**
```
URL: staging.castleelevator.com
.env.staging - test credentials
Pre-production testing
```

**Production**
```
URL: castleelevator.com
.env.production - live credentials
Max security and performance
```

---

## 10. Troubleshooting

### Build Fails Locally

```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors

```bash
# Check all files
npm run type-check

# Fix what you can
npm run lint:fix
npm run format
```

### Git Hooks Not Running

```bash
# Reinstall hooks
npm run setup:git-hooks

# Or manually
npx husky install
```

### Merge Conflicts

```bash
# Resolve manually, then:
git add .
git commit -m "fix: resolve merge conflicts"
```

---

## 11. Scripts Reference

```bash
# Development
npm run dev              # Start dev server (hot reload)
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Check for errors (fail on warnings)
npm run lint:fix         # Auto-fix linting issues
npm run format           # Auto-format code
npm run format:check     # Check formatting without changing
npm run type-check       # TypeScript type checking

# Setup
npm run setup:git-hooks  # Install Husky hooks
npm run prepare          # Called automatically on npm install
```

---

## 12. Next Steps (Phase 3)

- [ ] Connect SendGrid or Nodemailer for emails
- [ ] Setup MongoDB or PostgreSQL database
- [ ] Configure file upload to R2 or S3
- [ ] Implement reCAPTCHA on forms
- [ ] Add unit tests (Jest)
- [ ] Setup Sentry for error monitoring
- [ ] Add Google Analytics
- [ ] Configure domain and SSL

---

## Quick Checklist - Phase 2 Complete ✅

- [x] Git repository initialized
- [x] Branching strategy documented
- [x] GitHub Actions CI/CD pipeline configured
- [x] Environment variables plan created
- [x] Pre-commit hooks (Husky) installed
- [x] ESLint + Prettier configured
- [x] Base UI component library created
- [x] npm scripts configured
- [x] Code quality standards defined
- [x] Deployment documentation ready

---

**Questions?** Check [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for detailed workflow documentation.
