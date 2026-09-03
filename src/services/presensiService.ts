import { db } from "@/firebase/firebase";
import { Presensi } from "@/types/Presensi";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export async function simpanPresensi(data: Presensi) {
const id =
  `${data.pertemuanId}_${data.mahasiswaId}`;

  await setDoc(
    doc(db, "presensi", id),
    data
  );
}

export async function getPresensiByMatkul(
  matkulId: string,
  pertemuanId: string
) {
  const q = query(
  collection(db, "presensi"),
  where("matkulId", "==", matkulId),
  where("pertemuanId", "==", pertemuanId)
);

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getPresensiMahasiswa(mahasiswaId: string) {
  const q = query(
    collection(db, "presensi"),
    where("mahasiswaId", "==", mahasiswaId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
export async function getPresensiByMahasiswaDanPertemuan(
  mahasiswaId: string,
  pertemuanId: string
) {
  const q = query(
    collection(db, "presensi"),
    where("mahasiswaId", "==", mahasiswaId),
    where("pertemuanId", "==", pertemuanId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
  ...(snapshot.docs[0].data() as Presensi),
  };
}