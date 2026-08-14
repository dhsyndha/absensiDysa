import { db } from "@/firebase/firebase";
import { data } from "@/data/jadwal";
import { dataMahasiswa } from "./seedMahasiswa";
import { doc, setDoc } from "firebase/firestore";

export async function seedDatabase() {
  try {
    console.log("🚀 Import dimulai...");

    // Import Mata Kuliah
    for (const hari in data) {
      const jadwal = data[hari as keyof typeof data];

      for (const matkul of jadwal) {
        await setDoc(
          doc(db, "mataKuliah", matkul.id),
          matkul
        );

        console.log("✔ Matkul:", matkul.nama);
      }
    }

    // Import Mahasiswa
    for (const mahasiswa of dataMahasiswa) {
      await setDoc(
        doc(db, "mahasiswa", mahasiswa.id),
        mahasiswa
      );

      console.log("✔ Mahasiswa:", mahasiswa.nama);
    }

    console.log("🎉 Import selesai");
  } catch (error) {
    console.error(error);
  }
}