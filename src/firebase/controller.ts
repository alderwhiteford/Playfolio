import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

export default class FirebaseController {
  public app: FirebaseApp
  public db: Firestore
  public auth: Auth

  public constructor() {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const firebaseDb = getFirestore(firebaseApp);
    const firebaseAuth = getAuth(firebaseApp);

    this.app = firebaseApp
    this.db = firebaseDb
    this.auth = firebaseAuth
  }

  public async signIn(email: string, password: string) {
      await signInWithEmailAndPassword(this.auth, email, password)
  }

  public async signOut() {
      await this.auth.signOut()
  }
}
