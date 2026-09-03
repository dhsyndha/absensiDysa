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

const DEMO_KEY = "presensi-demo-data";

function isDemoMode() {
  return (
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("demo") === "true"
  );
}

function getDemoData(): any[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(DEMO_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveDemoData(data: any[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_KEY, JSON.stringify(data));
  }
}

export async function simpanPresensi(data: Presensi) {
  const id = `${data.pertemuanId}_${data.mahasiswaId}`;

  if (isDemoMode()) {
    const current = getDemoData();

    const updated = [
      ...current.filter((item) => item.id !== id),
      {
        ...data,
        id,
      },
    ];

    saveDemoData(updated);
    return;
  }

  await setDoc(
    doc(db, "presensi", id),
    data
  );
}

export async function getPresensiByMatkul(
  matkulId: string,
  pertemuanId: string
) {
  if (isDemoMode()) {
    return getDemoData().filter(
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
    return getDemoData().filter(
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
    const found = getDemoData().find(
      (item) =>
        item.mahasiswaId === mahasiswaId &&
        item.pertemuanId === pertemuanId
    );

    return found || null;
  }

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