@echo off
echo.
echo 🚀 Hugselle Deployment Script
echo ================================
echo.

REM Check if we're in a git repository
if not exist ".git" (
  echo ❌ Error: Not a git repository
  echo Please initialize git first: git init
  exit /b 1
)

echo 📦 Step 1: Building the project...
call npm run build

if errorlevel 1 (
  echo ❌ Build failed! Please fix errors and try again.
  exit /b 1
)

echo ✅ Build successful!
echo.

echo 📝 Step 2: Adding files to git...
git add .

echo 💾 Step 3: Committing changes...
git commit -m "Production ready - SEO, sitemap, robots, favicon, deployment config"

echo 🚀 Step 4: Pushing to GitHub...
git push origin main

if errorlevel 1 (
  echo ❌ Push failed! Please check your git configuration.
  exit /b 1
)

echo.
echo ✅ Successfully pushed to GitHub!
echo.
echo 📋 Next Steps:
echo 1. Go to your GitHub repo Settings → Pages
echo 2. Set Source to 'GitHub Actions'
echo 3. Configure your DNS (see deploy-checklist.md)
echo 4. Add custom domain in GitHub Pages settings
echo.
echo 🌐 Your site will be live at:
echo    https://hugselle.modernagecoders.com
echo.
echo 📖 For detailed instructions, see:
echo    - DEPLOYMENT-GUIDE.md
echo    - deploy-checklist.md
echo.
pause
