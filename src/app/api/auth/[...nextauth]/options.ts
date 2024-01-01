import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app"
import { db } from "@/app/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  }),
  events: {
    async createUser({ user }){
      const userDoc = doc(db, "users", user.id);
      await updateDoc(userDoc, { name: v4() });
    }
  },
  callbacks: {
    async session({ session, user }){
      session.user.id = user.id;
      return session;
    }
  },
  session: {
    maxAge: 60 * 60 * 48,
    strategy: 'database'
  }
}