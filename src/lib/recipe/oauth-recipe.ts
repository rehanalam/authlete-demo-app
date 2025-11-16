import { Recipe, RecipeStep } from "@/types/recipe";

const steps: RecipeStep[] = [
  // Step 0: Getting Started
  {
    id: "getting-started",
    title: "Getting Started",
    type: "page",
    description: "Introduction to the OAuth 2.0 Authorization Code Flow",
    contentPath: "/recipes/oauth/getting-started.md",
    requiresExecution: false,
  },

  // Step 1: Process Authorization Request
  {
    id: "process-authorization",
    title: "Process Authorization Request",
    type: "reference",
    description: "Initiate the authorization flow by processing the authorization request",
    contentPath: "/recipes/oauth/authorization-request.md",
    codeSamples: [
      {
        language: "nodejs",
        label: "TypeScript SDK",
        code: `import { Authlete } from "@authlete/typescript-sdk";

const authlete = new Authlete({
  bearer: process.env["AUTHLETE_BEARER"] ?? ""
});

async function run() {
  const result = await authlete.authorization.processRequest({
    serviceId: "{serviceId}",
    authorizationRequest: {
      parameters: "response_type=code&client_id={clientId}&redirect_uri={redirectUri}&scope={scope}&code_challenge={codeChallenge}&code_challenge_method={codeChallengeMethod}",
    },
  });

  console.log(result);
}

run();`,
      },
    ],

    apiConfig: {
      method: "POST",
      url: "/api/recipes/auth/process-authorization",
      headers: {
        "Content-Type": "application/json",
      },
      bodyTemplate: JSON.stringify({
        serviceId: "{serviceId}",
        clientId: "{clientId}",
        redirectUri: "{redirectUri}",
        scope: "{scope}",
        codeChallenge: "{codeChallenge}",
        codeChallengeMethod: "{codeChallengeMethod}",
      }),
    },
    requiresExecution: true,
    completionCriteria: {
      expectedStatus: 200,
      expectedFields: ["ticket", "action"],
    },
  },

  // Step 2: Issue Authorization
  {
    id: "issue-authorization",
    title: "Issue Authorization",
    type: "reference",
    description: "Issue authorization response after user grants access",
    contentPath: "/recipes/oauth/authorization-decision.md",
    codeSamples: [
      {
        language: "nodejs",
        label: "TypeScript SDK",
        code: `import { Authlete } from "@authlete/typescript-sdk";

const authlete = new Authlete({
  bearer: process.env["AUTHLETE_BEARER"] ?? ""
});

async function run() {
  const result = await authlete.authorization.issue({
    serviceId: "{serviceId}",
    authorizationIssueRequest: {
      ticket: "{ticket}",
      subject: "{subject}",
    },
  });

  console.log(result);
}

run();`,
      },
    ],

    apiConfig: {
      method: "POST",
      url: "/api/recipes/auth/issue-authorization",
      headers: {
        "Content-Type": "application/json",
      },
      bodyTemplate: JSON.stringify({
        serviceId: "{serviceId}",
        ticket: "{ticket}",
        subject: "{subject}",
      }),
      requiresAuth: false,
    },
    requiresExecution: true,
    completionCriteria: {
      expectedStatus: 200,
      expectedFields: ["authorizationCode", "action"],
    },
  },

  // Step 3: Create Access Token
  {
    id: "create-token",
    title: "Create Access Token",
    type: "reference",
    description: "Exchange authorization code for access token",
    contentPath: "/recipes/oauth/token-exchange.md",
    codeSamples: [
      {
        language: "nodejs",
        label: "TypeScript SDK",
        code: `import { Authlete } from "@authlete/typescript-sdk";

const authlete = new Authlete({
  bearer: process.env["AUTHLETE_BEARER"] ?? ""
});

async function run() {
  const result = await authlete.token.process({
    serviceId: "{serviceId}",
    tokenRequest: {
      parameters: "grant_type=authorization_code&code={authorizationCode}&redirect_uri={redirectUri}&code_verifier={codeVerifier}",
      clientId: "{clientId}",
      clientSecret: "{clientSecret}",
    },
  });

  console.log(result);
}

run();`,
      },
    ],
    apiConfig: {
      method: "POST",
      url: "/api/recipes/auth/create-token",
      headers: {
        "Content-Type": "application/json",
      },
      bodyTemplate: JSON.stringify({
        serviceId: "{serviceId}",
        authorizationCode: "{authorizationCode}",
        clientId: "{clientId}",
        clientSecret: "{clientSecret}",
        redirectUri: "{redirectUri}",
        codeVerifier: "{codeVerifier}",
      }),
    },
    requiresExecution: true,
    completionCriteria: {
      expectedStatus: 200,
      expectedFields: ["accessToken"],
    },
  },

  // Step 4: Introspect Token
  {
    id: "introspect-token",
    title: "Introspect Access Token",
    type: "reference",
    description: "Validate and get information about the access token",
    contentPath: "/recipes/oauth/introspect.md",
    codeSamples: [
      {
        language: "nodejs",
        label: "TypeScript SDK",
        code: `import { Authlete } from "@authlete/typescript-sdk";

const authlete = new Authlete({
  bearer: process.env["AUTHLETE_BEARER"] ?? ""
});

async function run() {
  const result = await authlete.introspection.process({
    serviceId: "{serviceId}",
    introspectionRequest: {
      token: "{accessToken}",
      scopes: {scopes},
      subject: "{subject}",
    },
  });

  console.log(result);
}

run();`,
      },
    ],
    apiConfig: {
      method: "POST",
      url: "/api/recipes/auth/introspect-token",
      headers: {
        "Content-Type": "application/json",
      },
      bodyTemplate: JSON.stringify({
        serviceId: "{serviceId}",
        token: "{accessToken}",
        scopes: "{scopes}",
        subject: "{subject}",
      }),
    },
    requiresExecution: true,
    completionCriteria: {
      expectedStatus: 200,
      expectedFields: ["action", "usable"],
    },
  },

  // Step 5: Completion
  {
    id: "completion",
    title: "Completion",
    type: "simple",
    description: "Congratulations! You have completed the OAuth 2.0 flow",
    contentPath: "/recipes/oauth/completion.md",
    requiresExecution: false,
  },
];

export const recipe: Recipe = {
  id: "oauth-recipe",
  title: "OAuth 2.0 Authorization Code Flow",
  description:
    "Step-by-step walkthrough for implementing OAuth 2.0 Authorization Code Flow with Authlete TypeScript SDK",
  difficulty: "beginner",
  estimatedTime: "20 minutes",
  category: "OAuth Flows",
  version: "1.0.0",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  steps,
};
