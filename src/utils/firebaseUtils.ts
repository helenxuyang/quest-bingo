// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch } from "firebase/firestore";
import { Quest } from "../models/Quest";
import { doc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_VzPMiCA3k_OSjuCB3TNVXQyamkiZJ4g",
  authDomain: "bingo-8c16b.firebaseapp.com",
  projectId: "bingo-8c16b",
  storageBucket: "bingo-8c16b.appspot.com",
  messagingSenderId: "515418238403",
  appId: "1:515418238403:web:809014c92e057c6c3c6176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const questsCollectionName = 'quests';
const questsCollection = collection(db, questsCollectionName);

export const fetchQuests = async (): Promise<Quest[]> => {
  const snapshot = await getDocs(questsCollection);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Quest));
}

export const writeQuests = async (quests: Quest[]) => {
  const batch = writeBatch(db);
  quests.forEach(async (quest, idx) => {
    const docRef = doc(questsCollection, `quest${idx < 10 ? '0' : ''}${idx}`);
    batch.set(docRef, { ...quest });
  });
  await batch.commit();

  return await fetchQuests();
}
