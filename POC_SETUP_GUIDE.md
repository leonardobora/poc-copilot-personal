# 🎯 GitHub Copilot POC Setup Guide

## Overview
This dashboard will help you track and showcase GitHub Copilot's impact on your team's productivity during your POC.

## 📋 Prerequisites Checklist
- ✅ Node.js installed (v22.14.0 detected)
- ⬜ GitHub Organization with Copilot licenses
- ⬜ GitHub Personal Access Token (PAT) with required permissions

---

## 🔑 Step 1: Create GitHub Personal Access Token

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a descriptive name like: `Copilot Metrics Dashboard - POC`
4. Set expiration (recommend 90 days for POC duration)
5. Select the following scopes:
   - ✅ `copilot` - Access Copilot usage metrics
   - ✅ `manage_billing:copilot` - Manage Copilot seat assignments
   - ✅ `read:org` - Read organization data
   - ✅ `read:user` - Read user profile data

6. Click **"Generate token"** and **copy it immediately** (you won't see it again!)

---

## ⚙️ Step 2: Configure Environment Variables

Open the `.env` file in `src/dashboard/.env` and replace these values:

```env
GITHUB_ENTERPRISE=your-enterprise-name-or-org-name
GITHUB_ORGANIZATION=your-organization-name
GITHUB_TOKEN=ghp_yourActualTokenHere123456789
GITHUB_API_SCOPE=organization
```

**Finding Your Values:**
- `GITHUB_ORGANIZATION`: Your GitHub org name (e.g., if your org URL is `github.com/acme-corp`, use `acme-corp`)
- `GITHUB_ENTERPRISE`: Usually same as organization unless you have GitHub Enterprise Cloud
- `GITHUB_API_SCOPE`: Use `organization` (most common) or `enterprise` if you have enterprise-level access

---

## 📦 Step 3: Install Dependencies

Run this command in the terminal:

```powershell
cd c:\Users\leonardo.costa\copilot-metrics-dashboard\src\dashboard
npm install
```

---

## 🚀 Step 4: Start the Dashboard

After installation completes, run:

```powershell
npm run dev
```

Then open your browser to: **http://localhost:3000**

---

## 📊 What You'll See in the Dashboard

### Main Metrics Page (`/`)
- **Acceptance Rate**: % of Copilot suggestions accepted by developers
- **Active Users**: Number of developers actively using Copilot
- **Adoption Rate**: Active users vs. total licensed seats
- **Language Breakdown**: Which programming languages are being used
- **Editor Breakdown**: Which IDEs/editors developers prefer
- **Team Filters**: Filter metrics by specific GitHub teams
- **Time Range Filters**: View daily, weekly, or monthly trends

### Seats Page (`/seats`)
- List of all users with Copilot licenses
- Active vs. inactive seat status
- User assignment details

---

## 📈 Tips for Your POC

### 1. **Baseline Metrics** (Week 1)
   - Document current productivity metrics (PRs, commits, review time)
   - Take screenshots of initial dashboard state
   - Note team size and composition

### 2. **Regular Monitoring** (Throughout POC)
   - Check dashboard weekly
   - Export data for reports (use the export feature)
   - Track acceptance rates trending upward (indicates developers finding value)
   - Monitor adoption rates (aim for 70%+ active usage)

### 3. **Success Indicators**
   - ✅ Acceptance rate > 25-30%
   - ✅ Adoption rate > 70%
   - ✅ Consistent daily active users
   - ✅ Diverse language/editor usage (shows broad applicability)

### 4. **Presentation Tips**
   - Filter by team to show specific group performance
   - Use date range filters to show trends over POC period
   - Export charts/data for executive presentations
   - Compare early vs. late POC metrics to show improvement

---

## 🛠️ Troubleshooting

### "401 Unauthorized" or API errors
- Check that your GitHub token has all required scopes
- Verify the token hasn't expired
- Ensure `GITHUB_ORGANIZATION` matches your actual org name

### "No data showing"
- Wait 24-48 hours after Copilot licenses are assigned (metrics need time to generate)
- Ensure developers are actively using Copilot
- Check that `GITHUB_API_SCOPE` is set correctly

### Port 3000 already in use
- Change the port: `npm run dev -- -p 3001`
- Or stop other applications using port 3000

---

## 📚 Additional Resources

- [GitHub Copilot Metrics API Docs](https://docs.github.com/en/enterprise-cloud@latest/rest/copilot/copilot-metrics)
- [Dashboard Features](README.md)
- [Deploy to Azure](../README.md#deploy-to-azure) (for production use after POC)

---

## 🎯 Next Steps After Local Setup

Once you validate the dashboard works locally, consider:

1. **Deploy to Azure** for team-wide access (see main README.md)
2. **Set up Authentication** using Azure AD for secure access
3. **Schedule Regular Reports** to stakeholders
4. **Create a POC Findings Document** with metrics and insights

---

## 📧 Questions?

Refer to the main [README.md](../../README.md) or check the [CONTRIBUTING.md](../../CONTRIBUTING.md) for more details.

**Happy tracking! 🚀**
