import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider,TwitterAuthProvider, signInWithPopup,signOut, getAdditionalUserInfo } from "firebase/auth";
import { getFirestore , addDoc, collection } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

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
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

const twitterProvider = new TwitterAuthProvider();
twitterProvider.addScope('profile');

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const details = getAdditionalUserInfo(res);

    if (details?.isNewUser) {
        await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        moderator:false,
  });
    }
  } catch (err) {
   
    }
};
const signInWithTwitter = async () => {
  try {
    const res = await signInWithPopup(auth, twitterProvider);
    const details = getAdditionalUserInfo(res);
    const user = res.user;

    if (details?.isNewUser) {
        await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        username:details.username,
        moderator:false,
    });
    }
  } catch (err) {
   console.log(err)
    }
};

const logout = () => {
    signOut(auth);
};
export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithTwitter,
  logout,
};
