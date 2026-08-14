import { db } from "@/firebase/firebase";
import { User } from "@/types/User";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getMahasiswaById } from "./mahasiswaService";


export async function getUser(uid: string) {
  const ref = doc(db, "users", uid);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  const userData = snapshot.data() as User;

  // Kalau user adalah mahasiswa,
  // ambil jabatan dari collection mahasiswa
  if (userData.role === "mahasiswa" && userData.refId) {

    const mahasiswa = await getMahasiswaById(
      userData.refId
    );

    if (mahasiswa?.jabatan) {
      userData.jabatan = mahasiswa.jabatan;
    }
  }

  return userData;
}


export async function createUser(user: User) {
  await setDoc(
    doc(db, "users", user.uid),
    user
  );
}


export async function updateUser(
  uid: string,
  data: Partial<User>
) {
  await updateDoc(
    doc(db, "users", uid),
    data
  );
}