import { collection, getDocs } from "firebase/firestore";
import { getSemuaMahasiswa } from "./mahasiswaService";
import { db } from "@/firebase/firebase";
import { Presensi } from "@/types/Presensi";
import { getSemuaMatkul } from "./matkulService";
import { getSemuaPertemuan } from "./pertemuanService";
import { materiMatkul } from "@/data/materiMatkul";
import { generateTanggalPertemuan } from "@/utils/jadwalPertemuan";

export async function getSemuaPresensi() {
  const snapshot = await getDocs(collection(db, "presensi"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (Presensi & { id: string })[];
}

export interface RekapMeeting {
  id: string;
  pertemuan: number;
  tanggal: string;
  materi: string;

  namaMK: string;
  dosen: string;
  totalMahasiswa: number;

  hadir: number;
  telat: number;
  izin: number;
  sakit: number;
  tidakHadir: number;

  persentase: number;

  mahasiswa: {
    id: string;
    nama: string;
    status: string;
    alasan?: string;
    fotoBukti?: string;
    jam?: string;
  }[];
}

export interface RekapLengkap {
  id: string;
  nama: string;
  dosen: string;
  hari: string;
  jam: string;
  ruangan: string;
  semester: number;

  statistik: {
    persen: number;
    hadir: number;
    total: number;
    tidakHadir: number;
    pertemuan: number;
  };

  meetings: RekapMeeting[];
}

export async function getRekapLengkap(): Promise<RekapLengkap[]> {
  const presensi = await getSemuaPresensi();
  const matkul = await getSemuaMatkul();
  const semuaPertemuan = await getSemuaPertemuan();
  const mahasiswa = await getSemuaMahasiswa();

  return matkul.map((mk) => {
    const kodeMK = mk.kodeMK || mk.id;
    const daftarMahasiswa = mahasiswa.filter((m) =>
      m.mataKuliah.includes(mk.id)
    );

    const totalMahasiswa = daftarMahasiswa.length;

    const data = presensi.filter(
      (p) => p.matkulId === mk.id
    );

    const hadir = data.filter((p) => p.status === "Hadir").length;
    const telat = data.filter((p) => p.status === "Telat").length;
    const izin = data.filter((p) => p.status === "Izin").length;
    const sakit = data.filter((p) => p.status === "Sakit").length;
    const berduka = data.filter((p) => p.status === "Berduka").length;
    const alfa = data.filter((p) => p.status === "Alfa").length;

    const persen =
      totalMahasiswa === 0
        ? 0
        : Math.round(((hadir + telat) / totalMahasiswa) * 100);

    const meetings: RekapMeeting[] = [];

    const daftarMateri = materiMatkul[kodeMK] ?? [];

    for (let i = 0; i < daftarMateri.length; i++) {
      const pertemuan = semuaPertemuan.find(
        (p) =>
          p.matkulId === mk.id &&
          p.pertemuan === i + 1
      );

      const dataMeeting = pertemuan
        ? presensi.filter(
            (p) => p.pertemuanId === pertemuan.id
          )
        : [];

      const hadirMeeting = dataMeeting.filter(
        (p) => p.status === "Hadir"
      ).length;

      const telatMeeting = dataMeeting.filter(
        (p) => p.status === "Telat"
      ).length;

      const izinMeeting = dataMeeting.filter(
        (p) => p.status === "Izin"
      ).length;

      const sakitMeeting = dataMeeting.filter(
        (p) => p.status === "Sakit"
      ).length;

      const alfaMeeting = dataMeeting.filter(
        (p) => p.status === "Alfa"
      ).length;

      meetings.push({
        id: pertemuan?.id ?? `dummy-${mk.id}-${i}`,
        pertemuan: i + 1,
        tanggal:
          pertemuan?.tanggal ??
          generateTanggalPertemuan(
            mk.hari,
            i
          ),
        materi:
          pertemuan?.materi ??
          daftarMateri[i],
          namaMK: mk.nama,
          dosen: mk.dosen,
          totalMahasiswa,

        hadir: hadirMeeting,
        telat: telatMeeting,
        izin: izinMeeting,
        sakit: sakitMeeting,
        tidakHadir: alfaMeeting,

        persentase:
          totalMahasiswa === 0
            ? 0
            : Math.round(
                ((hadirMeeting + telatMeeting) /
                  totalMahasiswa) *
                  100
              ),

        mahasiswa: daftarMahasiswa.map((mhs) => {
          const presensiMhs = dataMeeting.find(
            (p) => p.mahasiswaId === mhs.id
          );

          return {
            id: mhs.id,
            nama: mhs.nama,
            status: presensiMhs?.status ?? "Belum Absen",
            alasan: presensiMhs?.alasan ?? "",
            fotoBukti: presensiMhs?.fotoBukti ?? "",
            jam: presensiMhs?.jam ?? "",
          };
        }),
      });
    }

    return {
      id: mk.id,
      nama: mk.nama,
      dosen: mk.dosen,
      hari: mk.hari,
      jam: mk.jam,
      ruangan: mk.ruang,
      semester:  Number(mk.semester),

      statistik: {
        persen,
        hadir,
        total: totalMahasiswa,
        tidakHadir: izin + sakit + berduka + alfa,
        pertemuan: semuaPertemuan.filter(
          (p) => p.matkulId === mk.id
        ).length,
      },

      meetings,
    };
  });
}

export async function getRekapById(id: string) {
  const data = await getRekapLengkap();
  return data.find((item) => item.id === id) || null;
}