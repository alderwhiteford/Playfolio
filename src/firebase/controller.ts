import { AboutPage } from "@/types/models";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";

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

  /** AUTHENTICATION */
  public async signIn(email: string, password: string) {
      await signInWithEmailAndPassword(this.auth, email, password)
  }

  public async signOut() {
      await this.auth.signOut()
  }

  /** ABOUT PAGE */
  public async updateAbout(greeting: string, introduction: string) {
      const docRef = doc(this.db, 'sections', 'about')

      await setDoc(docRef, {
          greeting,
          introduction
      });
  }

  public async fetchAbout(): Promise<AboutPage> {
      const docRef = doc(this.db, 'sections', 'about')
      const docSnap = await getDoc(docRef)

      return docSnap.data() as AboutPage
  }
}
