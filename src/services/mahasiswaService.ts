import { db } from "@/firebase/firebase";
import { Mahasiswa } from "@/types/Mahasiswa";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export async function getSemuaMahasiswa() {
  const snapshot = await getDocs(collection(db, "mahasiswa"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Mahasiswa[];
}

export async function getMahasiswaById(id: string) {
  const snapshot = await getDoc(doc(db, "mahasiswa", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Mahasiswa;
}

export async function getMahasiswaByMatkul(matkulId: string) {
  const q = query(
    collection(db, "mahasiswa"),
    where("mataKuliah", "array-contains", matkulId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Mahasiswa[];
}

export async function updateStatusMahasiswa(
  id: string,
  data: Partial<Mahasiswa>
) {
  await updateDoc(doc(db, "mahasiswa", id), data);
}
export async function getMahasiswaByNim(
  nim: string
): Promise<Mahasiswa | null> {
  const q = query(
    collection(db, "mahasiswa"),
    where("nim", "==", nim)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  } as Mahasiswa;
}