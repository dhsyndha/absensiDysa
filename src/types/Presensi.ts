export type StatusPresensi =
  | "Belum"
  | "Hadir"
  | "Telat"
  | "Izin"
  | "Sakit"
  | "Berduka"
  | "Alfa";

export interface Presensi {
  id?: string;

  mahasiswaId: string;
  matkulId: string;
  pertemuanId: string;

  tanggal: string;
  jam: string;
  status: StatusPresensi;
  alasan: string;
  fotoBukti: string;
}