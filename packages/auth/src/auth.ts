import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

// Login
export const login = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

// Signup
export const signup = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user;
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

export const listenAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};