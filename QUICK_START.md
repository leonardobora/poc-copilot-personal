# 🎯 Quick Start - Your Next Steps

## ✅ What's Been Done
- Created `.env` configuration file in `src/dashboard/.env`
- Installed all npm dependencies (700 packages)
- Created comprehensive POC Setup Guide

## 🔴 WHAT YOU NEED TO DO NOW

### 1. Create Your GitHub Personal Access Token (5 minutes)

Visit: https://github.com/settings/tokens/new

**Settings:**
- Note: `Copilot Metrics Dashboard - POC`
- Expiration: `90 days` (or custom for your POC duration)
- Scopes to select:
  - [x] `copilot`
  - [x] `manage_billing:copilot`
  - [x] `read:org`
  - [x] `read:user`

Click "Generate token" and **COPY IT IMMEDIATELY**

### 2. Edit the `.env` File

Open: `c:\Users\leonardo.costa\copilot-metrics-dashboard\src\dashboard\.env`

Replace these three values with your actual information:

```env
GITHUB_ORGANIZATION=your-org-name-here
GITHUB_TOKEN=ghp_your_actual_token_here
```

**To find your organization name:**
- Go to your GitHub organization page
- The URL will be: `https://github.com/YOUR-ORG-NAME`
- Use that `YOUR-ORG-NAME` value

### 3. Start the Dashboard

Open terminal and run:

```powershell
cd c:\Users\leonardo.costa\copilot-metrics-dashboard\src\dashboard
npm run dev
```

### 4. Open in Browser

Navigate to: http://localhost:3000

## 📊 Expected Results

### First Time Loading
- The dashboard may take 10-20 seconds to load initially
- You should see metrics from your GitHub organization
- If no data appears, wait 24-48 hours after Copilot licenses were assigned

### What Success Looks Like
- ✅ Dashboard loads without errors
- ✅ You see user counts and seat information
- ✅ Metrics charts display (even if data is minimal)
- ✅ Filters work (date range, languages, editors)

## 🚨 Common Issues

**"Failed to fetch" or "401 Unauthorized"**
- Double-check your GitHub token has all required scopes
- Verify `GITHUB_ORGANIZATION` is spelled exactly as it appears in GitHub

**"No data available"**
- Normal if Copilot was just enabled (wait 24-48 hours)
- Ensure developers are actively using Copilot
- Check that users have accepted their Copilot seat assignments

**Port already in use**
- Run with different port: `npm run dev -- -p 3001`

## 📚 Full Documentation

See `POC_SETUP_GUIDE.md` for:
- Detailed explanation of all metrics
- Tips for running a successful POC
- How to present findings to stakeholders
- Next steps after validating locally

## 🎯 POC Timeline Suggestion

**Week 1:** Setup & baseline
- Complete this setup
- Document current productivity metrics
- Take initial dashboard screenshots

**Week 2-8:** Active monitoring
- Check dashboard weekly
- Gather developer feedback
- Track adoption trends

**Week 9:** Analysis & presentation
- Export final metrics
- Create findings presentation
- Make go/no-go decision

## 💡 Pro Tips

1. **Screenshot everything** - Before/after comparisons are powerful
2. **Track acceptance rate** - 25%+ is good, 30%+ is excellent
3. **Monitor adoption** - Aim for 70%+ of seats actively used
4. **Gather testimonials** - Developer quotes + metrics = compelling case

## ❓ Questions?

Check the main README.md or the comprehensive POC_SETUP_GUIDE.md

**You're all set! Just need to add your GitHub token and org name to `.env`** 🚀
