# Validation Script Usage

## Overview

The `validate-config.js` script helps you verify that your GitHub Copilot Metrics Dashboard configuration is correct before starting the application.

## Usage

### Quick Validation

From the dashboard directory:

```bash
npm run validate
```

Or run directly:

```bash
node validate-config.js
```

## What It Checks

The validation script performs the following checks:

### 1. ✓ Environment Variables

Verifies that all required environment variables are set:
- `GITHUB_ORGANIZATION` - Your GitHub organization name
- `GITHUB_ENTERPRISE` - Your GitHub enterprise name (often same as organization)
- `GITHUB_TOKEN` - Your Personal Access Token (displayed masked for security)
- `GITHUB_API_VERSION` - API version (should be `2022-11-28`)
- `GITHUB_API_SCOPE` - API scope (`organization` or `enterprise`)

### 2. ✓ GitHub API Connectivity

Tests connection to the GitHub API:
- Verifies your token is valid
- Shows authenticated user information
- Confirms API accessibility

### 3. ✓ Copilot Metrics API Access

Attempts to access the Copilot Metrics API:
- Tests organization/enterprise metrics endpoint
- Reports available metrics data
- Identifies permission or configuration issues

## Example Output

### Successful Validation

```
═══════════════════════════════════════════════════════════
  GitHub Copilot Metrics Dashboard - Configuration Validator
═══════════════════════════════════════════════════════════

📋 Validating Environment Variables...
✓ GITHUB_ORGANIZATION is set (my-org)
✓ GITHUB_ENTERPRISE is set (my-org)
✓ GITHUB_TOKEN is set (ghp_abc...xyz)
✓ GITHUB_API_VERSION is set (2022-11-28)
✓ GITHUB_API_SCOPE is set (organization)

🔌 Testing GitHub API Connectivity...
✓ GitHub API is accessible
ℹ Authenticated as: username (User Name)
ℹ Account type: User

📊 Testing Copilot Metrics API Access...
✓ Copilot Metrics API is accessible
ℹ Found 28 metrics entries
ℹ Date range: 2024-01-01 to 2024-01-28

═══════════════════════════════════════════════════════════
✓ All validation checks passed!
✓ Your configuration is ready to use.

You can now start the dashboard with:
  npm run dev

═══════════════════════════════════════════════════════════
```

### Failed Validation Example

```
═══════════════════════════════════════════════════════════
  GitHub Copilot Metrics Dashboard - Configuration Validator
═══════════════════════════════════════════════════════════

📋 Validating Environment Variables...
✓ GITHUB_ORGANIZATION is set (my-org)
✓ GITHUB_ENTERPRISE is set (my-org)
✓ GITHUB_TOKEN is set (ghp_abc...xyz)
✓ GITHUB_API_VERSION is set (2022-11-28)
✓ GITHUB_API_SCOPE is set (organization)

🔌 Testing GitHub API Connectivity...
✓ GitHub API is accessible
ℹ Authenticated as: username (User Name)
ℹ Account type: User

📊 Testing Copilot Metrics API Access...
✗ Copilot Metrics API returned 404 - Not Found
⚠ This could mean:
⚠   1. The organization does not have Copilot enabled
⚠   2. The organization name is incorrect
⚠   3. You are using a personal account instead of an organization
⚠   4. The Copilot Metrics API is not enabled for your organization

═══════════════════════════════════════════════════════════
⚠ Basic configuration is valid, but Copilot Metrics API is not accessible.

Possible next steps:
  1. Verify you are part of an organization with Copilot enabled
  2. Check that GITHUB_ORGANIZATION matches your org name exactly
  3. Ensure your token has the required scopes (copilot, read:org, manage_billing:copilot)
  4. Contact your GitHub organization admin to enable Copilot Metrics API

═══════════════════════════════════════════════════════════
```

## Common Issues and Solutions

### Issue: Token Permission Error (401/403)

**Symptoms:**
```
✗ Copilot Metrics API returned status 403 - Unauthorized/Forbidden
⚠ Your token may not have the required permissions
```

**Solution:**
1. Go to https://github.com/settings/tokens
2. Create a new token with these scopes:
   - `copilot` - Access Copilot metrics
   - `read:org` - Read organization data
   - `manage_billing:copilot` - Manage Copilot seats
   - `read:user` - Read user profile data
3. Update `GITHUB_TOKEN` in `.env`
4. Run validation again

### Issue: Organization Not Found (404)

**Symptoms:**
```
✗ Copilot Metrics API returned 404 - Not Found
```

**Possible Causes:**
1. Organization name is misspelled
2. You're not a member of the organization
3. Organization doesn't have Copilot enabled
4. Using a personal account instead of an organization

**Solution:**
1. Verify the organization name at https://github.com/settings/organizations
2. Ensure you're a member of the organization
3. Contact your organization admin to:
   - Enable GitHub Copilot for the organization
   - Enable Copilot Metrics API access
   - Add you to the organization if not already a member

### Issue: No Metrics Data

**Symptoms:**
```
✓ Copilot Metrics API is accessible
⚠ No metrics data available yet
```

**This is normal when:**
- Copilot was just enabled (< 24-48 hours)
- No developers have used Copilot yet
- Organization is brand new

**Solution:**
Wait 24-48 hours after Copilot licenses are assigned and developers start using it.

### Issue: Personal Account (Not Organization)

**Symptoms:**
The script validates OK but shows your personal username instead of an organization.

**Explanation:**
GitHub Copilot Metrics API is designed for organizations, not individual accounts with Copilot Individual.

**Solution:**
1. If you have Copilot Individual: This dashboard won't work. Use https://github.com/settings/copilot instead.
2. If you should be part of an organization: Contact your admin to be added.
3. For testing: Create a test organization with Copilot Business trial (if available).

## Environment Requirements

The script requires:
- Node.js (v18 or higher recommended)
- `.env` file in the same directory
- Internet connectivity (to reach api.github.com)

## Security Notes

- The token is displayed masked (e.g., `ghp_abc...xyz`) for security
- The `.env` file is in `.gitignore` and won't be committed
- Never share your token or `.env` file

## Related Documentation

- [CONFIGURACAO_TOKEN.md](../../CONFIGURACAO_TOKEN.md) - Complete token setup guide
- [POC_SETUP_GUIDE.md](../../POC_SETUP_GUIDE.md) - Full POC setup instructions
- [QUICK_START.md](../../QUICK_START.md) - Quick start guide

## Troubleshooting

If validation fails and you can't resolve the issue:

1. Check the error messages carefully
2. Review [CONFIGURACAO_TOKEN.md](../../CONFIGURACAO_TOKEN.md) for detailed setup instructions
3. Ensure you're using the correct organization name
4. Verify your token has all required scopes
5. Contact your GitHub organization administrator

## Manual Testing

If you want to test the API manually:

```bash
# Test basic authentication
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     -H "X-GitHub-Api-Version: 2022-11-28" \
     https://api.github.com/user

# Test metrics API (replace YOUR_ORG)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     -H "X-GitHub-Api-Version: 2022-11-28" \
     https://api.github.com/orgs/YOUR_ORG/copilot/metrics
```
