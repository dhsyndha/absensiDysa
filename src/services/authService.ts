import { auth, db } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { User } from "@/types/User";
import { getMahasiswaById } from "./mahasiswaService";
import { UserCredential } from "firebase/auth";

export async function login(
  nomorIdentitas: string,
  password: string
): Promise<{
  credential: UserCredential;
  user: User;
}> {
  const q = query(
    collection(db, "users"),
    where("nomorIdentitas", "==", nomorIdentitas)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Akun belum diaktivasi");
  }

  const userData = snapshot.docs[0].data() as User;

  if (userData.role === "mahasiswa" && userData.refId) {
    const mahasiswa = await getMahasiswaById(userData.refId);

    if (mahasiswa?.jabatan) {
      userData.jabatan = mahasiswa.jabatan;
    }
  }

  const credential = await signInWithEmailAndPassword(
    auth,
    userData.email,
    password
  );

  return {
    credential,
    user: userData,
  };
}