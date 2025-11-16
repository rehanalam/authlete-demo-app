# Introspect Access Token

Token introspection allows you to validate an access token and retrieve metadata about it. This is crucial for resource servers that need to verify tokens before granting access to protected resources.

## What This Step Does

The introspection endpoint:

1. **Validates the token**: Checks if the token exists, hasn't expired, and hasn't been revoked
2. **Returns token metadata**: Provides information about the token's properties, scopes, and associated user
3. **Confirms usability**: Indicates whether the token can be used to access resources

## Key Parameters

- **Service ID**: Your Authlete service API key
- **Access Token**: The token to introspect (from the previous step)
- **Scopes**: Optional list of scopes to check if the token has sufficient permissions
- **Subject**: Optional subject to verify the token belongs to a specific user

## Expected Response

On success, you'll receive:

- **Action**: The result of introspection (typically "OK" if valid)
- **Existent**: Whether the token exists in the system
- **Usable**: Whether the token can currently be used
- **Sufficient**: Whether the token has the required scopes (if scopes were specified)
- **Refreshable**: Whether the token can be refreshed
- **Expires At**: When the token will expire
- **Client ID**: The client the token was issued to
- **Subject**: The user the token represents
- **Scopes**: The permissions granted by this token

## Use Cases

Token introspection is used by:

- **Resource servers**: To validate tokens before serving protected resources
- **API gateways**: To authorize incoming requests
- **Monitoring systems**: To audit token usage
- **Token management**: To check token status before use

## Security Considerations

- Only resource servers should introspect tokens
- The introspection endpoint should be protected
- Token introspection doesn't extend token lifetime
- Always check both `usable` and `sufficient` flags before granting access

## Completion

Congratulations! You've completed the full OAuth 2.0 Authorization Code Flow:

1. ✅ Processed an authorization request
2. ✅ Issued authorization after user consent
3. ✅ Exchanged code for access token
4. ✅ Validated the access token through introspection

You now understand how to implement secure OAuth 2.0 flows using Authlete!
