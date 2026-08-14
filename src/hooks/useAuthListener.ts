import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/firebase/firebase";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/User";

export function useAuthListener() {
  const {
    setUser,
    setLoading,
  } = useAuth();

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          if (!firebaseUser) {
            setUser(null);
            setLoading(false);
            return;
          }

          const snap = await getDoc(
            doc(
              db,
              "users",
              firebaseUser.uid
            )
          );

          if (snap.exists()) {
            setUser(
              snap.data() as User
            );
          }

          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);
}