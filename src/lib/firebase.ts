// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  User 
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcg203vA5IBTOnCu683fx5zfUhGiE-oDg",
  authDomain: "zeedleai-69fe6.firebaseapp.com",
  projectId: "zeedleai-69fe6",
  storageBucket: "zeedleai-69fe6.firebasestorage.app",
  messagingSenderId: "486435790283",
  appId: "1:486435790283:web:3728400dc5a5da9400ea4e",
  measurementId: "G-HWPMXFVCQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics, auth };
export default app;

// Auth functions
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Optionally update profile with name
    // await updateProfile(user, { displayName: name });
    return { success: true, user };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { success: true, user };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    return { success: true, user };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
