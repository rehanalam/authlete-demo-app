# Process Authorization Request

The first step in the OAuth 2.0 Authorization Code Flow is to process the authorization request. This step initiates the OAuth flow by validating the authorization request parameters and generating a ticket for the authorization server.

## What This Step Does

When a client application wants to access protected resources on behalf of a user, it must first obtain authorization. This step:

1. **Validates the Request**: Checks that all required parameters (response_type, client_id, redirect_uri, etc.) are present and valid
2. **Issues a Ticket**: Generates a unique ticket that represents this authorization request session
3. **Returns Request Details**: Provides information about the requested scopes, client details, and what action should be taken next

## Key Parameters

- **Service ID**: Your Authlete service API key
- **Client ID**: The ID of the client application requesting authorization
- **Redirect URI**: Where the user will be redirected after authorization
- **Scope**: The permissions being requested (e.g., `timeline.read history.read`)
- **Code Challenge**: PKCE (Proof Key for Code Exchange) challenge for enhanced security
- **Code Challenge Method**: The method used to generate the code challenge (typically `S256`)

## Expected Response

On success, you'll receive:

- **Ticket**: A unique identifier for this authorization session (needed for the next step)
- **Action**: What the authorization server should do next (typically `INTERACTION`)
- **Client Details**: Information about the client making the request
- **Scopes**: The scopes being requested with their descriptions

## Next Steps

After successfully executing this step, use the returned **ticket** value in the next step to issue the authorization response.
