#!/usr/bin/env node

/**
 * Validation script for GitHub Copilot Metrics Dashboard configuration
 * This script validates the .env configuration and tests API connectivity
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env file manually
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        process.env[key.trim()] = value;
      }
    }
  }
  
  return true;
}

if (!loadEnv()) {
  console.error('\x1b[31m✗ .env file not found. Please create a .env file in the dashboard directory.\x1b[0m');
  process.exit(1);
}

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.cyan);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

// Validate environment variables
function validateEnvVars() {
  log('\n📋 Validating Environment Variables...', colors.blue);
  
  const requiredVars = [
    'GITHUB_ORGANIZATION',
    'GITHUB_ENTERPRISE',
    'GITHUB_TOKEN',
    'GITHUB_API_VERSION',
    'GITHUB_API_SCOPE'
  ];
  
  let allValid = true;
  
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value || value.trim() === '') {
      logError(`${varName} is missing or empty`);
      allValid = false;
    } else {
      if (varName === 'GITHUB_TOKEN') {
        // Mask token in output
        const maskedToken = value.substring(0, 7) + '...' + value.substring(value.length - 4);
        logSuccess(`${varName} is set (${maskedToken})`);
      } else {
        logSuccess(`${varName} is set (${value})`);
      }
    }
  }
  
  // Validate API scope
  const scope = process.env.GITHUB_API_SCOPE;
  if (scope !== 'organization' && scope !== 'enterprise') {
    logError(`GITHUB_API_SCOPE must be 'organization' or 'enterprise', got '${scope}'`);
    allValid = false;
  }
  
  return allValid;
}

// Make HTTP request using Node.js https module
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Test GitHub API connectivity
async function testGitHubAPI() {
  log('\n🔌 Testing GitHub API Connectivity...', colors.blue);
  
  const token = process.env.GITHUB_TOKEN;
  const version = process.env.GITHUB_API_VERSION;
  
  const options = {
    hostname: 'api.github.com',
    path: '/user',
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': version,
      'User-Agent': 'GitHub-Copilot-Metrics-Dashboard'
    }
  };
  
  try {
    const response = await makeRequest(options);
    
    if (response.statusCode === 200) {
      const userData = JSON.parse(response.data);
      logSuccess('GitHub API is accessible');
      logInfo(`Authenticated as: ${userData.login} (${userData.name || 'No name'})`);
      logInfo(`Account type: ${userData.type}`);
      return { success: true, user: userData };
    } else {
      logError(`GitHub API returned status ${response.statusCode}`);
      logError(`Response: ${response.data}`);
      return { success: false };
    }
  } catch (error) {
    logError(`Failed to connect to GitHub API: ${error.message}`);
    return { success: false };
  }
}

// Test Copilot Metrics API access
async function testCopilotMetricsAPI() {
  log('\n📊 Testing Copilot Metrics API Access...', colors.blue);
  
  const token = process.env.GITHUB_TOKEN;
  const version = process.env.GITHUB_API_VERSION;
  const organization = process.env.GITHUB_ORGANIZATION;
  const scope = process.env.GITHUB_API_SCOPE;
  
  let apiPath;
  if (scope === 'enterprise') {
    apiPath = `/enterprises/${process.env.GITHUB_ENTERPRISE}/copilot/metrics`;
  } else {
    apiPath = `/orgs/${organization}/copilot/metrics`;
  }
  
  const options = {
    hostname: 'api.github.com',
    path: apiPath,
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': version,
      'User-Agent': 'GitHub-Copilot-Metrics-Dashboard'
    }
  };
  
  try {
    const response = await makeRequest(options);
    
    if (response.statusCode === 200) {
      const metricsData = JSON.parse(response.data);
      logSuccess('Copilot Metrics API is accessible');
      if (metricsData && metricsData.length > 0) {
        logInfo(`Found ${metricsData.length} metrics entries`);
        logInfo(`Date range: ${metricsData[0].day} to ${metricsData[metricsData.length - 1].day}`);
      } else {
        logWarning('No metrics data available yet. This is normal for new Copilot installations.');
      }
      return { success: true, metrics: metricsData };
    } else if (response.statusCode === 404) {
      logError('Copilot Metrics API returned 404 - Not Found');
      logWarning('This could mean:');
      logWarning('  1. The organization does not have Copilot enabled');
      logWarning('  2. The organization name is incorrect');
      logWarning('  3. You are using a personal account instead of an organization');
      logWarning('  4. The Copilot Metrics API is not enabled for your organization');
      return { success: false };
    } else if (response.statusCode === 401 || response.statusCode === 403) {
      logError(`Copilot Metrics API returned status ${response.statusCode} - Unauthorized/Forbidden`);
      logWarning('Your token may not have the required permissions:');
      logWarning('  - copilot (to access Copilot metrics)');
      logWarning('  - read:org (to read organization data)');
      logWarning('  - manage_billing:copilot (to manage Copilot seats)');
      return { success: false };
    } else {
      logError(`Copilot Metrics API returned status ${response.statusCode}`);
      try {
        const errorData = JSON.parse(response.data);
        logError(`Error: ${errorData.message || 'Unknown error'}`);
      } catch (e) {
        logError(`Response: ${response.data}`);
      }
      return { success: false };
    }
  } catch (error) {
    logError(`Failed to access Copilot Metrics API: ${error.message}`);
    return { success: false };
  }
}

// Main validation function
async function main() {
  log('═══════════════════════════════════════════════════════════', colors.blue);
  log('  GitHub Copilot Metrics Dashboard - Configuration Validator', colors.blue);
  log('═══════════════════════════════════════════════════════════', colors.blue);
  
  // Step 1: Validate environment variables
  const envValid = validateEnvVars();
  if (!envValid) {
    logError('\n❌ Environment validation failed. Please check your .env file.');
    process.exit(1);
  }
  
  // Step 2: Test GitHub API
  const apiTest = await testGitHubAPI();
  if (!apiTest.success) {
    logError('\n❌ GitHub API test failed. Please check your token.');
    process.exit(1);
  }
  
  // Step 3: Test Copilot Metrics API
  const metricsTest = await testCopilotMetricsAPI();
  
  // Final summary
  log('\n═══════════════════════════════════════════════════════════', colors.blue);
  if (metricsTest.success) {
    logSuccess('✓ All validation checks passed!');
    logSuccess('✓ Your configuration is ready to use.');
    log('\nYou can now start the dashboard with:', colors.cyan);
    log('  npm run dev\n', colors.green);
  } else {
    logWarning('⚠ Basic configuration is valid, but Copilot Metrics API is not accessible.');
    log('\nPossible next steps:', colors.cyan);
    log('  1. Verify you are part of an organization with Copilot enabled', colors.yellow);
    log('  2. Check that GITHUB_ORGANIZATION matches your org name exactly', colors.yellow);
    log('  3. Ensure your token has the required scopes (copilot, read:org, manage_billing:copilot)', colors.yellow);
    log('  4. Contact your GitHub organization admin to enable Copilot Metrics API\n', colors.yellow);
  }
  log('═══════════════════════════════════════════════════════════\n', colors.blue);
}

// Run validation
main().catch((error) => {
  logError(`\nUnexpected error: ${error.message}`);
  process.exit(1);
});
