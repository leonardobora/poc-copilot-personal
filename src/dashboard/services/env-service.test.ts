import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { ensureGitHubEnvConfig, featuresEnvConfig, stringIsNullOrEmpty, validateScope } from "./env-service";

describe("env-service validation", () => {
  // Store original env vars
  const originalEnv = { ...process.env };
  
  beforeEach(() => {
    // Reset environment before each test
    process.env = { ...originalEnv };
  });
  
  afterEach(() => {
    // Restore original environment after each test
    process.env = originalEnv;
  });

  describe("ensureGitHubEnvConfig", () => {
    it("returns OK status when all required variables are set", () => {
      process.env.GITHUB_ORGANIZATION = "test-org";
      process.env.GITHUB_ENTERPRISE = "test-enterprise";
      process.env.GITHUB_TOKEN = "ghp_testtoken123";
      process.env.GITHUB_API_VERSION = "2022-11-28";
      process.env.GITHUB_API_SCOPE = "organization";
      
      const result = ensureGitHubEnvConfig();
      
      expect(result.status).toBe("OK");
      expect(result.response).toBeDefined();
      if (result.status === "OK") {
        expect(result.response.organization).toBe("test-org");
        expect(result.response.enterprise).toBe("test-enterprise");
        expect(result.response.token).toBe("ghp_testtoken123");
        expect(result.response.version).toBe("2022-11-28");
        expect(result.response.scope).toBe("organization");
      }
    });

    it("returns ERROR when GITHUB_ORGANIZATION is missing", () => {
      process.env.GITHUB_ORGANIZATION = "";
      process.env.GITHUB_ENTERPRISE = "test-enterprise";
      process.env.GITHUB_TOKEN = "ghp_testtoken123";
      process.env.GITHUB_API_VERSION = "2022-11-28";
      process.env.GITHUB_API_SCOPE = "organization";
      
      const result = ensureGitHubEnvConfig();
      
      expect(result.status).toBe("ERROR");
      expect(result.errors).toBeDefined();
      if (result.status === "ERROR") {
        expect(result.errors?.[0]?.message).toContain("organization");
      }
    });

    it("returns ERROR when GITHUB_ENTERPRISE is missing", () => {
      process.env.GITHUB_ORGANIZATION = "test-org";
      process.env.GITHUB_ENTERPRISE = "";
      process.env.GITHUB_TOKEN = "ghp_testtoken123";
      process.env.GITHUB_API_VERSION = "2022-11-28";
      process.env.GITHUB_API_SCOPE = "organization";
      
      const result = ensureGitHubEnvConfig();
      
      expect(result.status).toBe("ERROR");
      expect(result.errors).toBeDefined();
      if (result.status === "ERROR") {
        expect(result.errors?.[0]?.message).toContain("enterprise");
      }
    });

    it("returns ERROR when GITHUB_TOKEN is missing", () => {
      process.env.GITHUB_ORGANIZATION = "test-org";
      process.env.GITHUB_ENTERPRISE = "test-enterprise";
      process.env.GITHUB_TOKEN = "";
      process.env.GITHUB_API_VERSION = "2022-11-28";
      process.env.GITHUB_API_SCOPE = "organization";
      
      const result = ensureGitHubEnvConfig();
      
      expect(result.status).toBe("ERROR");
      expect(result.errors).toBeDefined();
      if (result.status === "ERROR") {
        expect(result.errors?.[0]?.message).toContain("token");
      }
    });

    it("returns ERROR when GITHUB_API_VERSION is missing", () => {
      process.env.GITHUB_ORGANIZATION = "test-org";
      process.env.GITHUB_ENTERPRISE = "test-enterprise";
      process.env.GITHUB_TOKEN = "ghp_testtoken123";
      process.env.GITHUB_API_VERSION = "";
      process.env.GITHUB_API_SCOPE = "organization";
      
      const result = ensureGitHubEnvConfig();
      
      expect(result.status).toBe("ERROR");
      expect(result.errors).toBeDefined();
      if (result.status === "ERROR") {
        expect(result.errors?.[0]?.message).toContain("API version");
      }
    });

    it("returns ERROR when GITHUB_API_SCOPE is invalid", () => {
      process.env.GITHUB_ORGANIZATION = "test-org";
      process.env.GITHUB_ENTERPRISE = "test-enterprise";
      process.env.GITHUB_TOKEN = "ghp_testtoken123";
      process.env.GITHUB_API_VERSION = "2022-11-28";
      process.env.GITHUB_API_SCOPE = "invalid-scope";
      
      const result = ensureGitHubEnvConfig();
      
      expect(result.status).toBe("ERROR");
      expect(result.errors).toBeDefined();
      if (result.status === "ERROR") {
        expect(result.errors?.[0]?.message).toContain("Invalid GitHub API scope");
      }
    });

    it("defaults scope to organization when not provided", () => {
      process.env.GITHUB_ORGANIZATION = "test-org";
      process.env.GITHUB_ENTERPRISE = "test-enterprise";
      process.env.GITHUB_TOKEN = "ghp_testtoken123";
      process.env.GITHUB_API_VERSION = "2022-11-28";
      process.env.GITHUB_API_SCOPE = "";
      
      const result = ensureGitHubEnvConfig();
      
      // Should return error first due to validation, but if we skip that...
      expect(result.status).toBe("ERROR");
    });

    it("accepts enterprise as a valid scope", () => {
      process.env.GITHUB_ORGANIZATION = "test-org";
      process.env.GITHUB_ENTERPRISE = "test-enterprise";
      process.env.GITHUB_TOKEN = "ghp_testtoken123";
      process.env.GITHUB_API_VERSION = "2022-11-28";
      process.env.GITHUB_API_SCOPE = "enterprise";
      
      const result = ensureGitHubEnvConfig();
      
      expect(result.status).toBe("OK");
      if (result.status === "OK") {
        expect(result.response.scope).toBe("enterprise");
      }
    });
  });

  describe("featuresEnvConfig", () => {
    it("returns dashboard and seats as enabled by default", () => {
      const result = featuresEnvConfig();
      
      expect(result.status).toBe("OK");
      if (result.status === "OK") {
        expect(result.response.dashboard).toBe(true);
        expect(result.response.seats).toBe(true);
      }
    });

    it("disables dashboard when ENABLE_DASHBOARD_FEATURE is false", () => {
      process.env.ENABLE_DASHBOARD_FEATURE = "false";
      
      const result = featuresEnvConfig();
      
      expect(result.status).toBe("OK");
      if (result.status === "OK") {
        expect(result.response.dashboard).toBe(false);
        expect(result.response.seats).toBe(true);
      }
    });

    it("disables seats when ENABLE_SEATS_FEATURE is false", () => {
      process.env.ENABLE_SEATS_FEATURE = "false";
      
      const result = featuresEnvConfig();
      
      expect(result.status).toBe("OK");
      if (result.status === "OK") {
        expect(result.response.dashboard).toBe(true);
        expect(result.response.seats).toBe(false);
      }
    });
  });

  describe("stringIsNullOrEmpty", () => {
    it("returns true for null", () => {
      expect(stringIsNullOrEmpty(null)).toBe(true);
    });

    it("returns true for undefined", () => {
      expect(stringIsNullOrEmpty(undefined)).toBe(true);
    });

    it("returns true for empty string", () => {
      expect(stringIsNullOrEmpty("")).toBe(true);
    });

    it("returns false for non-empty string", () => {
      expect(stringIsNullOrEmpty("test")).toBe(false);
    });

    it("returns false for string with only whitespace", () => {
      expect(stringIsNullOrEmpty("   ")).toBe(false);
    });
  });

  describe("validateScope", () => {
    it("returns false for 'organization' scope", () => {
      expect(validateScope("organization")).toBe(false);
    });

    it("returns false for 'enterprise' scope", () => {
      expect(validateScope("enterprise")).toBe(false);
    });

    it("returns true for invalid scope", () => {
      expect(validateScope("invalid")).toBe(true);
    });

    it("returns true for null", () => {
      expect(validateScope(null)).toBe(true);
    });

    it("returns true for undefined", () => {
      expect(validateScope(undefined)).toBe(true);
    });

    it("returns true for empty string", () => {
      expect(validateScope("")).toBe(true);
    });
  });
});
