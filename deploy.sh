#!/bin/bash

echo "🚀 Hugselle Deployment Script"
echo "================================"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
  echo "❌ Error: Not a git repository"
  echo "Please initialize git first: git init"
  exit 1
fi

echo "📦 Step 1: Building the project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed! Please fix errors and try again."
  exit 1
fi

echo "✅ Build successful!"
echo ""

echo "📝 Step 2: Adding files to git..."
git add .

echo "💾 Step 3: Committing changes..."
git commit -m "Production ready - SEO, sitemap, robots, favicon, deployment config"

echo "🚀 Step 4: Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully pushed to GitHub!"
  echo ""
  echo "📋 Next Steps:"
  echo "1. Go to your GitHub repo Settings → Pages"
  echo "2. Set Source to 'GitHub Actions'"
  echo "3. Configure your DNS (see deploy-checklist.md)"
  echo "4. Add custom domain in GitHub Pages settings"
  echo ""
  echo "🌐 Your site will be live at:"
  echo "   https://hugselle.modernagecoders.com"
  echo ""
  echo "📖 For detailed instructions, see:"
  echo "   - DEPLOYMENT-GUIDE.md"
  echo "   - deploy-checklist.md"
else
  echo "❌ Push failed! Please check your git configuration."
  exit 1
fi
