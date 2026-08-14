export interface Mahasiswa {
  id: string;
  nama: string;
  nim: string;
  noHp: string;
  kelas: string;
  mataKuliah: string[];
   jabatan?: "ketua" | "sekretaris" | "anggota";
}