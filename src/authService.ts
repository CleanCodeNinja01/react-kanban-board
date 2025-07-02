import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { appAuth } from './firebase.config';

type LoginResult =
  | { success: true; user: User }
  | { success: false; error: string };

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(appAuth, email, password);
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: errorMessage,
    };
  }
};

type LogoutResult =
  | { success: true }
  | { success: false; error: string };

export const logout = async (): Promise<LogoutResult> => {
  try {
    await signOut(appAuth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
