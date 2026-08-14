import { materiMatkul } from "@/data/materiMatkul";
import { db } from "@/firebase/firebase";
import { Pertemuan } from "@/models/Pertemuan";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getMatkulById } from "./matkulService";

export async function buatAtauAmbilPertemuan(
  matkulId: string
): Promise<{
  id: string;
  pertemuan: number;
  materi: string;
}> {

  // Cek apakah hari ini sudah ada pertemuan
  const tanggal = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Asia/Jakarta",
  });

  const q = query(
    collection(db, "pertemuan"),
    where("matkulId", "==", matkulId),
    where("tanggal", "==", tanggal)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data();

    return {
      id: snapshot.docs[0].id,
      pertemuan: data.pertemuan,
      materi: data.materi,
    };
  }

  // Hitung nomor pertemuan berikutnya
  const semua = await getDocs(
    query(
      collection(db, "pertemuan"),
      where("matkulId", "==", matkulId)
    )
  );

  const nomor =
    semua.empty
      ? 1
      : Math.max(
          ...semua.docs.map(
            (doc) => Number(doc.data().pertemuan) || 0
          )
        ) + 1;

  // Ambil data matkul
  const matkul = await getMatkulById(matkulId);

if (!matkul) {
  throw new Error("Mata kuliah tidak ditemukan");
}

const daftarMateri =
  materiMatkul[matkul.id] ||
  materiMatkul[matkul.kodeMK] ||
  [];

const materi =
  daftarMateri.at(nomor - 1) ??
  `Pertemuan ${nomor}`;

  const docRef = await addDoc(
    collection(db, "pertemuan"),
    {
      matkulId,
      pertemuan: nomor,
      tanggal,
      materi,
      createdAt: Date.now(),
    }
  );

  return {
    id: docRef.id,
    pertemuan: nomor,
    materi,
  };
}

export async function getSemuaPertemuan() {
  const snapshot = await getDocs(
    collection(db, "pertemuan")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Pertemuan[];
}

export async function getPreviewPertemuan(
  matkulId: string
): Promise<{
  pertemuan: number;
  materi: string;
} | null> {

  const matkul = await getMatkulById(matkulId);

  if (!matkul) return null;

  const tanggal = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Asia/Jakarta",
  });

  // Cek apakah hari ini sudah ada pertemuan
  const q = query(
    collection(db, "pertemuan"),
    where("matkulId", "==", matkulId),
    where("tanggal", "==", tanggal)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data();

    return {
      pertemuan: data.pertemuan,
      materi: data.materi,
    };
  }

  // Kalau belum ada pertemuan hari ini
  return {
    pertemuan: 1,
    materi:
      materiMatkul[matkul.kodeMK || matkul.id]?.[0] ??
      "Pertemuan 1",
  };
}