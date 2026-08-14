import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

async function updateNoHp() {
  const snapshot = await getDocs(collection(db, "mahasiswa"));

  let nomor = 801;

  for (const item of snapshot.docs) {
    await updateDoc(doc(db, "mahasiswa", item.id), {
      noHp: `081234567${nomor}`,
    });

    console.log(`${item.data().nama} -> 081234567${nomor}`);
    nomor++;
  }

  console.log("✅ Selesai");
}

updateNoHp();