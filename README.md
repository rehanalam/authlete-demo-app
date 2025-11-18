# Authlete Recipes

Explore Authlete OAuth recipes in a guided experience. Browse organizations, complete initial onboarding and execute recipe. Run each step with the built-in code runner.

## Run Locally

- Install dependencies: `npm install`
- Configure Authlete access (recommended): `AUTHLETE_BEARER=<token>` and optionally `AUTHLETE_BASE_URL=<url>` in your env; placeholder data loads without them.
- Start the dev server: `npm run dev` then visit `http://localhost:3000` and pick an organization to enter its dashboard.

## Testing

- Run the Vitest suite: `npm test`
- Watch mode: `npm run test:watch`
- Coverage: `npm run test:coverage`
- Lint (optional): `npm run lint`

## Github Repository

https://github.com/rehanalam/authlete-demo-app

## Deploy on Vercel

https://authlete-demo-app.vercel.app/
