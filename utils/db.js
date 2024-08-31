import { collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { showToast } from './toast';

export const fetchData = async (collectionName, condition) => {
  const result = [];
  try {
    const collectionRef = collection(db, collectionName);

    let queryRef;
    if (condition) {
      queryRef = query(collectionRef, condition);
    } else {
      queryRef = query(collectionRef);
    }

    const querySnapshot = await getDocs(queryRef);
    querySnapshot.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();
      result.push({ ...data, id });
    });

    return result;
  } catch (error) {
    console.log('Fail to fetch data: ', error);
    showToast('error', 'Fail to fetch data', error);
  }
};

export const fetchDoc = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);
    const docData = docSnapshot.data();

    return { docRef, docSnapshot, docData };
  } catch (error) {
    console.log('Fail to get doc: ', error);
    showToast('error', 'Fail to get doc', error);
  }
};

export const updateSingleDoc = async (collectionName, docId, updatedData) => {
  try {
    await updateDoc(doc(db, collectionName, docId), updatedData);
  } catch (error) {
    console.log('Fail to update single doc: ', error);
    showToast('error','Fail to update single doc', error)
  } 
}