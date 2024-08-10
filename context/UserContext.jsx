import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const UserContext = createContext();

export default function UserProvider({children}) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userCollection = collection(db, "Users");
        const userQuery = query(
          userCollection,
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(userQuery);
        let docData;
        let docId;
        querySnapshot.docs.forEach((doc) => {
            docData = doc.data();
            docId = doc.id;
        })

        if (docData) {
            setUserData({...docData, docId})
        } else {
            setUserData();
        }
      } else {
        setUserData();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
        {children}
    </UserContext.Provider>
  )
}
