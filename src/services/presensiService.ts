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

const demoPresensi: Record<string, Presensi> = {};

function isDemoMode() {
  return (
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("demo") === "true"
  );
}

export async function simpanPresensi(data: Presensi) {
  const id = `${data.pertemuanId}_${data.mahasiswaId}`;

  if (isDemoMode()) {
    demoPresensi[id] = {
      ...data,
      id,
      jam:
        data.jam ||
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    };
    return;
  }

  await setDoc(doc(db, "presensi", id), data);
}

export async function getPresensiByMatkul(
  matkulId: string,
  pertemuanId: string
) {
  if (isDemoMode()) {
    return Object.values(demoPresensi).filter(
      (item) =>
        item.matkulId === matkulId &&
        item.pertemuanId === pertemuanId
    );
  }

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

export async function getPresensiMahasiswa(
  mahasiswaId: string
) {
  if (isDemoMode()) {
    return Object.values(demoPresensi).filter(
      (item) => item.mahasiswaId === mahasiswaId
    );
  }

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
  if (isDemoMode()) {
    return (
      demoPresensi[`${pertemuanId}_${mahasiswaId}`] || null
    );
  }

  const q = query(
    collection(db, "presensi"),
    where("mahasiswaId", "==", mahasiswaId),
    where("pertemuanId", "==", pertemuanId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...(snapshot.docs[0].data() as Presensi),
  };
}