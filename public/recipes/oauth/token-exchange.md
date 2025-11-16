# Exchange Authorization Code for Access Token

This step exchanges the authorization code received in the previous step for an access token and refresh token. This is the core of the OAuth 2.0 Authorization Code Flow.

## What This Step Does

The client application sends the authorization code back to the authorization server along with:

1. The authorization code
2. Its client credentials (client ID and optionally client secret)
3. The same redirect URI used in the initial request
4. The PKCE code verifier (if PKCE was used)

The authorization server validates everything and issues tokens.

## Key Parameters

- **Service ID**: Your Authlete service API key
- **Authorization Code**: The code received from the previous step
- **Client ID**: The ID of the client application
- **Client Secret**: The secret for confidential clients (optional for public clients)
- **Redirect URI**: Must exactly match the URI from the initial authorization request
- **Code Verifier**: The PKCE code verifier that corresponds to the code challenge

## Expected Response

On success, you'll receive:

- **Access Token**: The token used to access protected resources
- **Refresh Token**: A token that can be used to obtain new access tokens
- **Token Type**: Usually "Bearer"
- **Expires In**: How long the access token is valid (in seconds)
- **Scope**: The scopes that were actually granted
- **Subject**: The user identifier

## Access Token Properties

The access token:

- **Is bearer-based**: Anyone with the token can use it
- **Has an expiration**: Typically 1 hour, but configurable
- **Represents specific permissions**: Based on the granted scopes
- **Should be kept secure**: Treat it like a password

## Next Steps

Use the **access token** in the next step to introspect it and verify its validity and properties.
