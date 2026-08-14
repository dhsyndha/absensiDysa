export interface User {
  uid: string;
  nama: string;
  nomorIdentitas: string;
  role:
    | "admin"
    | "dosen"
    | "mahasiswa";
  jabatan:
    | "ketua"
    | "sekretaris"
    | "anggota";
  email: string;
  aktif: boolean;
  refId: string;
}