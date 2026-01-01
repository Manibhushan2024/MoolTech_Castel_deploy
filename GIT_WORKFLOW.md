# CastleElevator Git Workflow & Branching Strategy

## Overview
This document outlines the Git workflow, branching strategy, and collaboration guidelines for the CastleElevator Next.js project.

## Branching Strategy (Git Flow)

### Main Branches

1. **`main`** (Production)
   - Stable, production-ready code
   - Protected branch - requires pull request and code review
   - Only updated via merge requests from `release/` branches
   - Tagged with version numbers (v1.0.0, v1.1.0, etc.)
   - Automated deployment to production on merge

2. **`develop`** (Development)
   - Integration branch for features
   - Contains latest development changes
   - Protected branch - requires pull request and code review
   - Automated deployment to staging on merge
   - Source for feature branches

### Supporting Branches

3. **`feature/*`** (Feature Development)
   - Branch from: `develop`
   - Naming: `feature/user-auth`, `feature/image-upload`, `feature/api-integration`
   - Merge back to: `develop` via Pull Request
   - Delete after merge: Yes
   - Lifecycle: Temporary (development only)

4. **`bugfix/*`** (Bug Fixes)
   - Branch from: `develop`
   - Naming: `bugfix/contact-form-validation`, `bugfix/dark-mode-flicker`
   - Merge back to: `develop` via Pull Request
   - Delete after merge: Yes

5. **`hotfix/*`** (Critical Production Fixes)
   - Branch from: `main`
   - Naming: `hotfix/security-patch`, `hotfix/form-crash`
   - Merge back to: `main` AND `develop`
   - Delete after merge: Yes
   - Requires immediate review and deployment

6. **`release/*`** (Release Preparation)
   - Branch from: `develop`
   - Naming: `release/1.1.0`, `release/2.0.0`
   - Merge to: `main` (via PR with tag)
   - Merge back to: `develop`
   - Lifecycle: Temporary (for final testing before production)

## Workflow Steps

### Feature Development

```bash
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. Make commits (frequent, meaningful)
git add .
git commit -m "feat: add voice recorder feature"
git commit -m "feat: integrate voice upload to API"

# 3. Push to remote
git push origin feature/your-feature-name

# 4. Create Pull Request on GitHub
# - Add description
# - Link related issues
# - Request reviewers
# - Ensure CI passes

# 5. After review approval, merge via GitHub
# GitHub will handle squash merge option
```

### Creating a Release

```bash
# 1. Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/1.1.0

# 2. Update version numbers in:
# - package.json (version field)
# - README.md (if versioned)
# - Any other version references

git commit -m "chore: bump version to 1.1.0"

# 3. Test thoroughly in this branch
# - Run full test suite
# - Test in staging environment
# - Fix any last-minute bugs

# 4. Create Pull Request to main
# - Add release notes in PR description
# - Request QA/product approval

# 5. After merge to main:
git checkout main
git pull origin main
git tag v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0

# 6. Merge back to develop
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

### Critical Hotfix

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/security-issue

# 2. Fix the issue
git commit -m "fix: patch security vulnerability"

# 3. Create Pull Request to main
# - Add detailed explanation
# - Mark as URGENT

# 4. After merge and tag:
git tag v1.1.1
git push origin v1.1.1

# 5. Merge back to develop
git checkout develop
git merge main
git push origin develop
```

## Commit Message Convention

Follow Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, or tooling
- **ci**: CI/CD configuration changes

### Examples
```
feat(contact-form): add voice recorder functionality
fix(dark-mode): prevent flicker on page reload
docs(readme): update setup instructions
refactor(components): extract common button logic
chore(deps): upgrade Next.js to 16.1.1
```

## Pull Request Guidelines

### Before Creating PR
- [ ] Branch is up to date with `develop`
- [ ] All tests pass locally (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Code follows project conventions
- [ ] Commit messages follow convention

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Screenshots
(If UI changes)

## Testing
Steps to test the changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No new warnings generated
```

## Code Review Checklist

Reviewers should verify:
- ✅ Code follows project style and conventions
- ✅ No security vulnerabilities introduced
- ✅ Performance not negatively impacted
- ✅ Tests adequately cover changes
- ✅ Documentation is accurate and complete
- ✅ Breaking changes are documented
- ✅ Commit messages follow convention

## Protected Branch Rules

### `main` Branch
- ✅ Require pull request reviews (minimum 2)
- ✅ Require status checks to pass (CI/CD)
- ✅ Require branches to be up to date
- ✅ Require code review dismissal before merge
- ✅ Restrict who can push (maintainers only)
- ✅ Automatically dismiss stale PR approvals

### `develop` Branch
- ✅ Require pull request reviews (minimum 1)
- ✅ Require status checks to pass (CI/CD)
- ✅ Require branches to be up to date
- ✅ Allow force pushes: No
- ✅ Allow deletions: No

## Tag Convention

Version tags follow Semantic Versioning:

```
v<MAJOR>.<MINOR>.<PATCH>

Examples:
v1.0.0    (First release)
v1.1.0    (New feature)
v1.1.1    (Bug fix)
v2.0.0    (Major breaking change)
```

## Squash vs Merge

- **Feature branches**: Squash merge (clean history)
- **Release branches**: Regular merge (preserve commit history)
- **Hotfix branches**: Regular merge (track critical fixes)

## Local Setup

```bash
# Clone repository
git clone https://github.com/yourusername/castleelevator.git
cd castleelevator

# Setup git hooks
npm run setup:git-hooks

# Configure git for this project
git config user.name "Your Name"
git config user.email "your.email@company.com"
```

## Common Commands Reference

```bash
# Switch to develop and create new feature
git checkout develop && git pull
git checkout -b feature/new-feature

# Keep branch updated with develop
git fetch origin
git rebase origin/develop

# Squash commits before merging
git rebase -i origin/develop

# Check branch status
git status
git log --oneline -10

# Delete local branch after merge
git branch -d feature/completed-feature

# Delete remote branch
git push origin --delete feature/completed-feature
```

## CI/CD Integration

All branches automatically trigger:
- ✅ ESLint & Prettier checks
- ✅ TypeScript compilation
- ✅ Build verification (npm run build)
- ✅ Unit tests (npm run test)
- ✅ Type checking (tsc --noEmit)

Pull requests cannot be merged until all checks pass.

## Emergency Procedures

### If main is broken
1. Identify the breaking commit
2. Create `hotfix/revert-xxx` branch from `main`
3. Revert the breaking commit
4. Merge hotfix immediately
5. Post-mortem on the breaking PR

### If commits are pushed to main directly
1. Revert the commits immediately
2. Create proper PR for changes
3. Review branch protection settings
4. Re-evaluate team access

## Contact & Questions

For questions about this workflow, contact:
- **Team Lead**: admin@castleelevator.com
- **DevOps**: infra@castleelevator.com

---

Last Updated: January 1, 2026
