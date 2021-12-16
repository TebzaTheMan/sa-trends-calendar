import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider ,TwitterAuthProvider, signInWithPopup,signOut } from "firebase/auth";
import { getFirestore ,query,addDoc, collection , where, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"),where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        moderator:false,
  });
    }
  } catch (err) {
    console.error("Failed to signIn with google" + err);
    }
};

const signInWithTwitter = async () => {
    try {
    const res = await signInWithPopup(auth, twitterProvider);
    const user = res.user;
    const q = query(collection(db, "users"),where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "twitter",
        email: user.email,
        moderator:false,
  });
    }
  } catch (err) {
    console.error("Failed to signIn with Twitter" + err);
    }
}

const logout = () => {
    signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  signInWithTwitter,
  logout,
};