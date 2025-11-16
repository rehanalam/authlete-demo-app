# Issue Authorization Response

After processing the authorization request, the next step is to issue the authorization response. This step represents the user granting (or denying) authorization to the client application.

## What This Step Does

This step simulates the user's decision to grant access to the client application. In a real-world scenario, this would happen after:

1. The user is redirected to a login page
2. The user authenticates themselves
3. The user is shown a consent screen with the requested scopes
4. The user clicks "Allow" or "Deny"

## Key Parameters

- **Service ID**: Your Authlete service API key
- **Ticket**: The ticket received from the previous authorization request step
- **Subject**: The unique identifier of the user granting access (e.g., user ID, email, or username)

## Expected Response

On success, you'll receive:

- **Authorization Code**: A short-lived code that represents the user's authorization
- **Action**: What should be done next (typically `LOCATION` indicating a redirect)
- **Response Content**: The complete redirect URL with the authorization code

## Authorization Code

The authorization code is a temporary credential that proves the user authorized the client. It should be:

- **Short-lived**: Typically expires in seconds to minutes
- **Single-use**: Can only be exchanged for tokens once
- **Bound to the client**: Can only be used by the client that initiated the request

## Next Steps

Use the returned **authorization code** in the next step to exchange it for access and refresh tokens.
