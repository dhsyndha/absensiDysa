import {
  getMahasiswaByMatkul,
} from "@/services/mahasiswaService";
import {
  getJadwalHariIni,
  updateStatusDosen,
} from "@/services/matkulService";
import { useUser } from "@/hooks/useUser";
import {
  canEditPresensi,
  canImportDatabase,
  canKelolaMaster,
} from "@/services/permissionService";
import { getBelumAbsen } from "@/services/notifikasiService";
import { Mahasiswa } from "@/types/Mahasiswa";
import { MataKuliah } from "@/types/MataKuliah";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { router, useFocusEffect } from "expo-router";
import { getPreviewPertemuan } from "@/services/pertemuanService";
import {
  useCallback,
  useState
} from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function kirimNotifikasi(
  title: string,
  body: string
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });
}

import {
  FlatList,
  Linking,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Header from "../../components/Header";
import { styles } from "../../styles/dashboard.styles";

const hari = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
] as const;

const hariIni = hari[new Date().getDay()];

type JadwalItem = MataKuliah & {
  jumlahMahasiswa: number;
};

export default function Dashboard() {
   const user = useUser();
const [jadwalHariIni, setJadwalHariIni] =
  useState<JadwalItem[]>([]);

const [mahasiswaMatkul, setMahasiswaMatkul] =
  useState<Mahasiswa[]>([]);

const [daftarBelum, setDaftarBelum] =
  useState<Mahasiswa[]>([]);

const [showBelumAbsen, setShowBelumAbsen] =
  useState(false);

  const [previewPertemuan, setPreviewPertemuan] =
  useState<{
    pertemuan: number;
    materi: string;
  } | null>(null);
useFocusEffect(
  useCallback(() => {
    loadJadwal();
  }, [])
);

async function loadJadwal() {
  const result = await getJadwalHariIni(hariIni);

  const hasil = await Promise.all(
    result.map(async (item) => {
      const dataMahasiswa = await getMahasiswaByMatkul(item.id);

      return {
        ...item,
        jumlahMahasiswa: dataMahasiswa.length,
      };
    })
  );


    setJadwalHariIni(hasil);

    const sekarang = hasil.find(
      (item) =>
        nowMinutes >= toMinutes(item.jam) &&
        nowMinutes < endMinutes(item.jam)
    );

if (sekarang) {
  const dataMahasiswa =
    await getMahasiswaByMatkul(sekarang.id);

  setMahasiswaMatkul(dataMahasiswa);

  const preview =
    await getPreviewPertemuan(sekarang.id);

  setPreviewPertemuan(preview);

  const hariIniString = new Date()
    .toISOString()
    .split("T")[0];

  console.log("Dashboard tanggal:", hariIniString);

  const belum = await getBelumAbsen(
    sekarang.id,
    hariIniString
  );

  setDaftarBelum(belum);
} else {
  setMahasiswaMatkul([]);
  setPreviewPertemuan(null);
}
  }

  const toMinutes = (jam: string) => {
    const [mulai] = jam.split(" - ");
    const [h, m] = mulai.split(".").map(Number);
    return h * 60 + m;
  };

  const endMinutes = (jam: string) => {
    const [, selesai] = jam.split(" - ");
    const [h, m] = selesai.split(".").map(Number);
    return h * 60 + m;
  };

  const now = new Date();

  const nowMinutes =
    now.getHours() * 60 + now.getMinutes();

  const matkulSekarang = jadwalHariIni.find(
    (item) =>
      nowMinutes >= toMinutes(item.jam) &&
      nowMinutes < endMinutes(item.jam)
  );

    const statusDosen =
      matkulSekarang?.statusDosen ?? "belum";

      const daftarNama = daftarBelum
    .map(
      (m, i) => `${i + 1}. ${m.nama}`
    )
    .join("\n");

  const matkulSelanjutnya =
    jadwalHariIni.find(
      (item) =>
        nowMinutes < toMinutes(item.jam)
    );

  const matkulSelesai =
    jadwalHariIni.filter(
      (item) =>
        nowMinutes >= endMinutes(item.jam)
    );



    return (
  <ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
  >
    <Header name={user?.nama ?? "Pengguna"} />

    {matkulSekarang && (
      <View style={styles.currentCard}>
        <View style={styles.iconCircle}>
          <FontAwesome5
            name="book-open"
            size={28}
            color="#2563EB"
          />
        </View>

        <Text style={styles.subject}>
          {matkulSekarang.nama}
        </Text>

        {statusDosen === "hadir" && (
          <Text
            style={{
              color: "#16A34A",
              fontWeight: "700",
              marginTop: 5,
            }}
          >
            🟢 Dosen Masuk
          </Text>
        )}

        {statusDosen === "tidakHadir" && (
          <Text
            style={{
              color: "#DC2626",
              fontWeight: "700",
              marginTop: 5,
            }}
          >
            🔴 Dosen Tidak Masuk
          </Text>
        )}

        <Text style={styles.info}>
          👨‍🏫 {matkulSekarang.dosen}
        </Text>

        <Text style={styles.info}>
          🕗 {matkulSekarang.jam}
        </Text>

        <Text style={styles.info}>
          📍 {matkulSekarang.ruang}
        </Text>

        <Text style={styles.info}>
          👥 {matkulSekarang.jumlahMahasiswa} Mahasiswa
        </Text>
        {previewPertemuan && (
          <Text style={styles.previewMateri}>
            📖 Pertemuan {previewPertemuan.pertemuan} {previewPertemuan.materi}
          </Text>
        )}

      {user && (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/absensi/[id]",
              params: {
                id: String(matkulSekarang.id),
              },
            })
          }
        >
          <Text style={styles.buttonText}>
            Buka Absensi
          </Text>
        </TouchableOpacity>
      )}
            </View>
    )}

    {matkulSelesai.length > 0 && (
      <>
        <Text style={styles.section}>
          Mata Kuliah Selesai
        </Text>

        {matkulSelesai.map((item) => (
          <View
            key={item.id}
            style={styles.nextCard}
          >
            <Text style={styles.nextTitle}>
              {item.nama}
            </Text>

            <Text style={styles.nextTime}>
              {item.jam}
            </Text>

            <Text style={styles.nextRoom}>
              ✅ Absensi Ditutup
            </Text>
          </View>
        ))}
      </>
    )}

    {matkulSelanjutnya && (
      <>
        <Text style={styles.section}>
          Mata Kuliah Selanjutnya
        </Text>

        <View style={styles.nextCard}>
          <Text style={styles.nextTitle}>
            {matkulSelanjutnya.nama}
          </Text>

          <Text style={styles.nextTime}>
            {matkulSelanjutnya.jam}
          </Text>

          <Text style={styles.nextRoom}>
            {matkulSelanjutnya.ruang}
          </Text>
        </View>
      </>
    )}

    <Text style={styles.section}>
      Jadwal Hari Ini
    </Text>

    <View style={styles.scheduleCard}>
      {jadwalHariIni.map((item) => (
        <View
          key={item.id}
          style={styles.scheduleItem}
        >
          <View>
            <Text style={styles.scheduleName}>
              {item.nama}
            </Text>

            <Text style={styles.scheduleTime}>
              {item.jam}
            </Text>
          </View>

          <Text style={styles.room}>
            {item.ruang}
          </Text>
        </View>
      ))}
    </View>

    {}
    {matkulSekarang && user && canEditPresensi(user) && (
  <>
    <Text style={styles.section}>
      Kontrol Kehadiran Dosen
    </Text>

    <View style={styles.controlCard}>
      <Text style={styles.controlSub}>
        Mata kuliah yang sedang berlangsung
      </Text>

      <Text style={styles.controlTitle}>
        {matkulSekarang.nama}
      </Text>

      <Text style={styles.controlTime}>
        {matkulSekarang.jam} • {matkulSekarang.ruang}
      </Text>

      <View style={styles.divider} />

      <View style={styles.teacherRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {matkulSekarang.dosen
              .split(" ")
              .slice(0, 2)
              .map((nama) => nama[0])
              .join("")}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.teacherName}>
            {matkulSekarang.dosen}
          </Text>

          <Text
            style={[
              styles.teacherStatus,
              {
                color:
                  statusDosen === "hadir"
                    ? "#16A34A"
                    : statusDosen === "tidakHadir"
                    ? "#DC2626"
                    : "#64748B",
              },
            ]}
          >
            {statusDosen === "hadir"
              ? "🟢 Hadir"
              : statusDosen === "tidakHadir"
              ? "🔴 Tidak Hadir"
              : "⚪ Belum Dikonfirmasi"}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.label,
          { marginTop: 20 },
        ]}
      >
        Dosen Masuk Kelas?
      </Text>

      {statusDosen === "belum" ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.greenButton,
            ]}
            onPress={async () => {
              await updateStatusDosen(
                matkulSekarang.id,
                "hadir"
              );
              loadJadwal();
            }}
          >
            <Text style={styles.actionText}>
              Dosen Hadir
            </Text>

            <Text style={styles.actionSub}>
              Lanjutkan Absensi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.redButton,
            ]}
            onPress={async () => {
              await updateStatusDosen(
                matkulSekarang.id,
                "tidakHadir"
              );
              loadJadwal();
            }}
          >
            <Text style={styles.actionText}>
              Dosen Tidak Hadir
            </Text>

            <Text style={styles.actionSub}>
              Atur Absensi
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            backgroundColor:
              statusDosen === "hadir"
                ? "#DCFCE7"
                : "#FEE2E2",
            padding: 16,
            borderRadius: 15,
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              color:
                statusDosen === "hadir"
                  ? "#15803D"
                  : "#DC2626",
            }}
          >
            {statusDosen === "hadir"
              ? "🟢 Dosen Hadir"
              : "🔴 Dosen Tidak Hadir"}
          </Text>
        </View>
      )}

      <Text style={styles.section}>
        Pengingat Absensi
      </Text>

      <View style={styles.reminderCard}>
        <Text style={styles.reminderSub}>
          Akan dikirim 30 menit sebelum kelas berakhir
        </Text>

        <View style={styles.reminderItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.reminderTitle}>
              {matkulSekarang.nama}
            </Text>

            <Text style={styles.reminderInfo}>
              Belum absen : {daftarBelum.length} mahasiswa
            </Text>
          </View>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => setShowBelumAbsen(true)}
          >
            <Text style={styles.smallButtonText}>
              Lihat
            </Text>
          </TouchableOpacity>
        </View>

                <TouchableOpacity
          style={styles.sendButton}
          onPress={async () => {
            const pesan = `📢 PENGINGAT ABSENSI

              Mata Kuliah : ${matkulSekarang.nama}
              Mahasiswa yang belum melakukan absensi:
              ${daftarNama || "Semua mahasiswa sudah melakukan absensi. 😊"}
              Mohon segera mengisi presensi sebelum perkuliahan berakhir.
              Terima kasih.`;

            Linking.openURL(
              `https://web.whatsapp.com/send?text=${encodeURIComponent(
                pesan
              )}`
            );
            await kirimNotifikasi(
              "Pengingat Berhasil",
              `${daftarBelum.length} mahasiswa telah diberi pengingat absensi.`
            );
          }}
        >
          <Text style={styles.sendButtonText}>
            Kirim Pesan Sekarang
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </>
)}

<Modal
  visible={showBelumAbsen}
  transparent
  animationType="slide"
  onRequestClose={() => setShowBelumAbsen(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>

      <Text style={styles.modalTitle}>
        Belum Absen ({daftarBelum.length})
      </Text>

      <FlatList
        data={daftarBelum}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.modalItem}>
            <Text style={styles.modalNama}>
              {item.nama}
            </Text>

            <Text style={styles.modalNim}>
              {item.nim}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setShowBelumAbsen(false)}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Tutup
        </Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>

</ScrollView>
);
}