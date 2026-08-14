import { User } from "@/types/User";

export function isAdmin(user: User | null) {
  return user?.role === "admin";
}

export function isDosen(user: User | null) {
  return user?.role === "dosen";
}

export function isMahasiswa(user: User | null) {
  return user?.role === "mahasiswa";
}

export function isKetua(user: User | null) {
  return user?.jabatan === "ketua";
}

export function isSekretaris(user: User | null) {
  return user?.jabatan === "sekretaris";
}

export function canEditPresensi(user: User | null) {
  return (
    isAdmin(user) ||
    isDosen(user) ||
    isKetua(user) ||
    isSekretaris(user)
  );
}

export function canImportDatabase(user: User | null) {
  return (
    isAdmin(user) ||
    isDosen(user) ||
    isKetua(user) ||
    isSekretaris(user)
  );
}

export function canEditMateri(user: User | null) {
  return (
    isAdmin(user) ||
    isDosen(user)
  );
}

export function canKelolaMaster(user: User | null) {
  return isAdmin(user);
}