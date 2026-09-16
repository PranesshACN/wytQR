# Integrating WytPass SSO with Next.js

Complete guide for Next.js applications using WytPass SSO as their identity provider.

## 1. What this SSO provides

| Capability | Endpoint | Notes |
|---|---|---|
| OIDC Discovery | `GET https://api.wytnet.com/.well-known/openid-configuration` | Auto-config |
| JWKS (public keys) | `GET https://api.wytnet.com/.well-known/jwks.json` | RS256 |
| Authorize | `GET https://wytnet.com/oauth/authorize` | Browser-redirect |
| Token | `POST https://api.wytnet.com/oauth/token` | Exchange code |
| UserInfo | `GET https://api.wytnet.com/oauth/userinfo` | Profile data |

---

## 2. Register your app

- **App Name:** `WYTQR`
- **Redirect URIs:** `http://localhost:3000/callback`
- **Client ID:** `wp_9608924f8edf0a60f90c`
- **Client Secret:** `wps_7470d4cf64c43e8affa7ccbd2c499589b6b48e32`

---

## 3. Environment Variables (`.env.local`)
```env
# Only 2 variables required for production!
WYTPASS_CLIENT_ID=wp_9608924f8edf0a60f90c
WYTPASS_CLIENT_SECRET=wps_7470d4cf64c43e8affa7ccbd2c499589b6b48e32

# Optional overrides (only needed for local development):
# WYTPASS_ISSUER=https://api.wytnet.com
# WYTPASS_REDIRECT_URI=http://localhost:3000/callback
```

---

## 4. NextAuth v4 Route Handler (`src/app/api/auth/[...nextauth]/route.ts`)
```typescript
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

const issuer = process.env.WYTPASS_ISSUER || "https://api.wytnet.com";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "wytpass",
      name: "WytPass",
      type: "oauth",
      issuer: issuer,
      authorization: {
        url: "https://wytnet.com/oauth/authorize",
        params: { scope: "openid profile email" }
      },
      token: `${issuer}/oauth/token`, 
      userinfo: `${issuer}/oauth/userinfo`, 
      jwks_endpoint: `${issuer}/.well-known/jwks.json`, 
      clientId: process.env.WYTPASS_CLIENT_ID,
      clientSecret: process.env.WYTPASS_CLIENT_SECRET,
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile: any) {
        return {
          id: profile.user?.id || profile.sub || "unknown_id",
          name: profile.user?.name || profile.name || profile.email || "Unnamed User",
          email: profile.user?.email || profile.email || "unknown@wytnet.com",
          image: profile.user?.profilePicture || profile.picture || null,
          subscriptions: profile.subscriptions || [],
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        try {
          const res = await fetch(`${issuer}/oauth/userinfo`, {
            headers: { Authorization: `Bearer ${account.access_token}` }
          });
          if (res.ok) {
            const profileData = await res.json();
            token.subscriptions = profileData.subscriptions || [];
            token.userProfile = profileData.user || null;
          }
        } catch (error) {
          console.error("Error fetching userinfo:", error);
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.subscriptions = token.subscriptions || [];
        session.user.profile = token.userProfile || null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## 5. Troubleshooting & Configuration FAQs

### OAuthCallbackError / SSL routines / tls_get_more_records: packet length too long (EPROTO)

**Root Cause**:
This error occurs when the Next.js server makes backend API requests (such as exchanging authorization codes or requesting profile userinfo) using the `https://` protocol to a local development instance of the WytPass SSO server (e.g. `localhost:8000`) that is only listening on unencrypted `http://`.

**Solution**:
1. Check that your `WYTPASS_ISSUER` environment variable inside `.env.local` matches the exact protocol of your Identity Provider:
   - Local: `http://localhost:8000`
   - Production: `https://<your-sso-domain>`
2. Update the endpoints dynamically in your NextAuth route handler to use the issuer protocol (e.g. `${process.env.WYTPASS_ISSUER || "http://localhost:8000"}/oauth/token`) instead of hardcoding `https://`.
