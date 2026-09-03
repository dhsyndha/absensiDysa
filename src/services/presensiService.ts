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
  const q = query(
    collection(db, "presensi"),
    where("matkulId", "==", matkulId),
    where("pertemuanId", "==", pertemuanId)
  );

  const snapshot = await getDocs(q);

  const firebaseData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Presensi[];

  if (!isDemoMode()) {
    return firebaseData;
  }

  return firebaseData.map((item) => {
    const demo = demoPresensi[
      `${item.pertemuanId}_${item.mahasiswaId}`
    ];

    return demo || item;
  });
}

export async function getPresensiMahasiswa(
  mahasiswaId: string
) {
  const q = query(
    collection(db, "presensi"),
    where("mahasiswaId", "==", mahasiswaId)
  );

  const snapshot = await getDocs(q);

  const firebaseData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Presensi[];

  if (!isDemoMode()) {
    return firebaseData;
  }

  return firebaseData.map((item) => {
    const demo = demoPresensi[
      `${item.pertemuanId}_${item.mahasiswaId}`
    ];

    return demo || item;
  });
}

export async function getPresensiByMahasiswaDanPertemuan(
  mahasiswaId: string,
  pertemuanId: string
) {
  if (isDemoMode()) {
    const demo =
      demoPresensi[`${pertemuanId}_${mahasiswaId}`];

    if (demo) {
      return demo;
    }
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