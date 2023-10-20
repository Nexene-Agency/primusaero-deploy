import {
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "@firebase/auth";
import Joi from "joi";
import { REGEX } from "@framework/constants";

export interface RegisterWithEmail {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const REGISTER_WITH_EMAIL_SCHEMA = Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  email: Joi.string().required().min(2).max(128),
  password: Joi.string().required().min(8).max(128),
});

export interface EmailCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const EMAIL_CREDENTIALS_SCHEMA = Joi.object({
  email: Joi.string().required().pattern(REGEX.EMAIL),
  password: Joi.string().required().min(8).max(128),
  rememberMe: Joi.boolean().required(),
});

export const logout = (auth: Auth): Promise<void> => {
  return new Promise((resolve) => {
    signOut(auth)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("cannot logout");
        resolve();
      });
  });
};

/**
 * Executes a login with an e-mail and password.
 * @param auth The Firebase authentication client
 * @param credentials The credentials to use
 * @return The logged-in user
 */
export const signInWithEmail = async (
  auth: Auth,
  credentials: EmailCredentials
): Promise<UserCredential> => {
  return new Promise((resolve, reject) => {
    auth
      .setPersistence(
        credentials.rememberMe
          ? browserLocalPersistence
          : browserSessionPersistence
      )
      .then(() =>
        signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        )
      )
      .then((user) => resolve(user))
      .catch((error) => reject(error));
  });
};
