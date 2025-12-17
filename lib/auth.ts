import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedinProvider from 'next-auth/providers/linkedin';
import InstagramProvider from 'next-auth/providers/instagram';
import type { AuthOptions } from "next-auth";
import { Instagram } from 'lucide-react';

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account",
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID!,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
        }),
        LinkedinProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            }
        }
    },
    callbacks: {
        async session({ session, token }) {
            // if (session?.user && token?.sub) {
            //     session.user.id = token.sub;
            // }
            return session;
        },
        async jwt({ token, account, profile }) {
            // Only update on sign in
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        }
    },
    // Add these for better debugging
    debug: process.env.NODE_ENV === 'development',
};