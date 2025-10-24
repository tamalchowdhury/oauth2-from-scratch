# OAuth2 From Scratch

Learning OAuth2 by implementing the Authorization Code flow manually (no auth libraries).

## What This Does
- Implements "Sign in with Google and Github" from scratch
- Manually handles authorization URL generation
- Exchanges authorization code for tokens
- Fetches user info using access token
- Manages user session

## What I Learned
- How OAuth2 Authorization Code flow works step-by-step
- Why state parameter is critical for security
- Difference between authorization code and access token
- Why token exchange happens on backend
- How to validate and use access tokens

## Setup
1. Create Google OAuth credentials
2. Add to `.env.local`
3. `npm install && npm run dev`
4. Visit http://localhost:3000

## Key Files
- `/app/api/auth/login/route.ts` - Initiates OAuth flow
- `/app/api/auth/callback/route.ts` - Handles OAuth callback
- `/lib/oauth.ts` - OAuth helper functions