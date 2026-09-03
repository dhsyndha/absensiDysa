import { Mahasiswa } from "@/types/Mahasiswa";

export const dataMahasiswa: Mahasiswa[] = [];

const namaMahasiswa = [
  "Dhea Anggraini",
  "Yoga Pratama",
  "Raka Saputra",
  "Sinta Putri",
  "Andi Saputra",
  "Mutiara Salsabila",
  "Fajar Ramadhan",
  "Nadia Azzahra",
  "Muhammad Rizky",
  "Putri Amelia",
  "Bagas Kurniawan",
  "Aisyah Nursyifa",
  "Ahmad Fauzan",
  "Tiara Febriani",
  "Dewi Sartika",
  "Kevin Pratama",
  "Farhan Alamsyah",
  "Selvi Wulandari",
  "Irfan Maulana",
  "Rani Oktaviani",
  "Wisnu Aditya",
  "Yuliana Putri",
  "Heri Setiawan",
  "Ayu Lestari",
  "Rendi Saputra",
  "Lutfi Ramadhan",
  "Desi Rahmawati",
  "Muhammad Farhan",
  "Salma Nurhaliza",
  "Fikri Al Fatah",
  "Bima Aryatna",
  "Siti Khairunnisa",
  "Rizki Maulana",
  "Nabila Putri",
  "Hafiz Ramadhan",
];

function getMataKuliah(index: number): string[] {
  const matkul: string[] = [];

  if (index < 32) matkul.push("MK001");

  if (index < 33) matkul.push("MK002");

  if (index < 35) matkul.push("MK003");

  if (index < 30) matkul.push("MK004");

  if (index < 31) matkul.push("MK005");

  if (index < 29) matkul.push("MK006");

  if (index < 35) matkul.push("MK007");

  if (index < 35) matkul.push("MK008");

  if (index < 35) matkul.push("MK009");

  return matkul;
}

for (let i = 0; i < 35; i++) {
  dataMahasiswa.push({
    id: `MHS${String(i + 1).padStart(3, "0")}`,
    nama: namaMahasiswa[i],
    nim: `221011${String(i + 1).padStart(4, "0")}`,
    noHp: `081234567${String(i + 1).padStart(3, "0")}`,
    kelas: "TI-5A",
    mataKuliah: getMataKuliah(i),
  });
}