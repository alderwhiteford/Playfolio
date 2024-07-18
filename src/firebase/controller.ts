import { AboutPage, IdToWork, Work } from "@/types/models";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default class FirebaseController {
  public app: FirebaseApp
  public db: Firestore
  public auth: Auth
  public storage: FirebaseStorage

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
    const firebaseStorage = getStorage(firebaseApp);

    this.app = firebaseApp
    this.db = firebaseDb
    this.auth = firebaseAuth
    this.storage = firebaseStorage
  }

  /** AUTHENTICATION */
  public async signIn(email: string, password: string) {
      await signInWithEmailAndPassword(this.auth, email, password)
  }

  public async signOut() {
      await this.auth.signOut()
  }

  /** ABOUT SECTION */
  public async updateAbout(greeting: string, introduction: string) {
      const docRef = doc(this.db, 'about', 'about')

      await setDoc(docRef, {
          greeting,
          introduction
      });
  }

  public async fetchAbout(): Promise<AboutPage> {
      const docRef = doc(this.db, 'about', 'about')
      const docSnap = await getDoc(docRef)

      return docSnap.data() as AboutPage
  }

  /** SKILLS SECTION */
  public async fetchSkills() {
      const docSnap = await getDocs(collection(this.db, 'skills'))

      return docSnap.docs.map((doc) => doc.data())
  }

  public async deleteSkill(title: string) {
    const q = query(collection(this.db, "skills"), where("title", "==", title));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

  public async createSkill(title: string, logo: File) {
    const storageRef = ref(this.storage, logo.name);

    await uploadBytes(storageRef, logo);
    const downloadUrl = await getDownloadURL(storageRef)

    await addDoc(collection(this.db, "skills"), {
      title: title,
      logo: downloadUrl,
    });

    return { title, logo: downloadUrl }
  }

  /** WORK SECTION */
  public async fetchWorks(): Promise<IdToWork[]> {
    const docSnap = await getDocs(collection(this.db, 'work'))

    return docSnap.docs.map((doc) => ({ id: doc.id, work: doc.data() as Work }))
  }

  public async createWork(work: Work): Promise<string> {
    const docSnap = await addDoc(collection(this.db, "work"), work);
    return docSnap.id
  }

  public async deleteWork(id: string): Promise<void> {
    await deleteDoc(doc(this.db, "work", id));
  }

  public async updateWork(id: string, work: Work): Promise<void> {
    const docRef = doc(this.db, 'work', id)

    await setDoc(docRef, { ...work });
  }
}
