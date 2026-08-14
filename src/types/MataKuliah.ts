export interface MataKuliah {
  id: string;
  kodeMK: string;
  nama: string;
  hari: string;
  semester: number;
  jam: string;
  ruang: string;
  dosen: string;
  mahasiswa: number;
  statusDosen?: "belum" | "hadir" | "tidakHadir";
}