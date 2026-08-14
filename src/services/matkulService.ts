import { db } from "@/firebase/firebase";
import { MataKuliah } from "@/types/MataKuliah";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

export async function getSemuaMatkul() {
  const snapshot = await getDocs(collection(db, "mataKuliah"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as MataKuliah[];
}

export async function getMatkulById(id: string) {
  const snapshot = await getDoc(doc(db, "mataKuliah", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as MataKuliah;
}

export async function getJadwalHariIni(hari: string) {
  const q = query(
    collection(db, "mataKuliah"),
    where("hari", "==", hari)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as MataKuliah[];
}

export async function updateStatusDosen(
  id: string,
  status: "belum" | "hadir" | "tidakHadir"
) {
  await updateDoc(doc(db, "mataKuliah", id), {
    statusDosen: status,
  });
}