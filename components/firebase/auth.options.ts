import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {FirestoreAdapter} from "@auth/firebase-adapter";
import {cert} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {Roles, ROLES_COLLECTION} from "@components/dashboard/users/model";

const fireStoreAdapter = FirestoreAdapter({
  // firestore database instance
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\n/gm, "\n"),
  }),
});

// FIXME: ??? what is the problem
export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: fireStoreAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  events: {
    async createUser(message) {
      console.log("createUser message:", message);
      // when user is created, it must indexed, and also the roles must be created

      const firestore = getFirestore();
      const roles = {
        valid: true,
        roles: ["user", "admin", "editor"],
      } as Roles; // email verification to do! FIXME: remove admin and editor roles before going live

      firestore
        .collection(ROLES_COLLECTION)
        .doc(message.user.id)
        .set(roles)
        .then((result) => {
          // console.log("roles indexed:", result);
        })
        .catch((_) => {
          // empty on purpose
        });
    },
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      // console.log("signIn user:", user); // this goes to the "users" collection
      // console.log("signIn account", account);
      // console.log("signIn profile", profile);
      // console.log("signIn email", email);
      // console.log("signIn credentials", credentials);
      return true;
    },
    async redirect({url, baseUrl}) {
      // console.log("redirect url:", url);
      // console.log("redirect baseUrl:", baseUrl);
      return baseUrl;
    },
    async session({session, token, user}) {
      console.log("session in adapter:", session);
      // console.log("session token:", token);
      // console.log("session user:", user);
      session.userId = user.id;
      return session;
    },
  },
};
