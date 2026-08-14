import { getMahasiswaByMatkul } from "./mahasiswaService";
import { getSemuaPresensi } from "./rekapService";

export async function getBelumAbsen(
  matkulId: string,
  tanggal: string
) {
  const mahasiswa = await getMahasiswaByMatkul(matkulId);
  const presensi = await getSemuaPresensi();

  const presensiHariIni = presensi.filter(
    (item) =>
      item.matkulId === matkulId &&
      item.tanggal === tanggal
  );

  console.log("Tanggal Dashboard:", tanggal);
  console.log("Semua presensi:", presensi);
  console.log("Presensi hari ini:", presensiHariIni);
  console.log("Jumlah mahasiswa:", mahasiswa.length);
  console.log("Belum absen:", mahasiswa.filter(
  (mhs) => !presensiHariIni.some(
    (p) => p.mahasiswaId === mhs.id
  )
).length);
  return mahasiswa.filter(
    (mhs) =>
      !presensiHariIni.some(
        (p) => p.mahasiswaId === mhs.id
      )
  );
}