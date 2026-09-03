import { getMahasiswaById } from "@/services/mahasiswaService";
import { simpanPresensi, getPresensiByMahasiswaDanPertemuan } from "@/services/presensiService";
import { Mahasiswa } from "@/types/Mahasiswa";
import {
  Presensi,
  StatusPresensi,
} from "@/types/Presensi";
import { Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailAbsensi() {
  const {
  mahasiswaId,
  matkulId,
  pertemuanId,
} = useLocalSearchParams<{
  mahasiswaId: string;
  matkulId: string;
  pertemuanId: string;
}>();

  const [mahasiswa, setMahasiswa] =
    useState<Mahasiswa | null>(null);

  const [status, setStatus] =
    useState<StatusPresensi>("Belum");

  const [alasan, setAlasan] =
    useState("");

  const [foto, setFoto] = useState("");
  const [jamAbsen, setJamAbsen] = useState("");
  const [loading, setLoading] =
    useState(false);


 const [modalData, setModalData] = useState({
  visible: false,
  icon: "✅",
  title: "",
  message: "",
  success: false,
});

useEffect(() => {
  loadMahasiswa();
}, []);


  function showModal(
  icon: string,
  title: string,
  message: string,
  success = false
) {
  setModalData({
    visible: true,
    icon,
    title,
    message,
    success,
  });
}


async function ambilFoto() {
  const permission =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
  Alert.alert(
    "Izin Kamera",
    "Aplikasi membutuhkan akses kamera."
  );
  return;
}

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.7,
  });

  if (!result.canceled) {
    setFoto(result.assets[0].uri);
  }
}

  async function loadMahasiswa() {
    if (!mahasiswaId) return;

    try {
      const data =
        await getMahasiswaById(mahasiswaId);

      setMahasiswa(data);

      const presensi = await getPresensiByMahasiswaDanPertemuan(
        mahasiswaId,
        pertemuanId
      );

      if (presensi) {
      const data = presensi as Presensi;

      setStatus(data.status);
      setAlasan(data.alasan);
      setFoto(data.fotoBukti);
      setJamAbsen(data.jam);
      showModal(
        "ℹ️",
        "Presensi Sudah Dilakukan",
        "Anda sudah melakukan presensi untuk pertemuan ini."
      );
      return;
    }

    setStatus("Belum");
    setAlasan("");
    setFoto("");
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSave() {
    if (!mahasiswa) return;

    if (status === "Belum") {
      showModal(
        "⚠️",
        "Status Presensi",
        "Silakan pilih status kehadiran terlebih dahulu."
      );
      return;
    }

    if (
      ["Telat", "Izin"].includes(status) &&
      alasan.trim() === ""
    ) {
      showModal(
        "📝",
        "Alasan Diperlukan",
        "Silakan isi alasan terlebih dahulu."
      );
      return;
    }

    try {
      setLoading(true);
      if (
        ["Hadir", "Telat"].includes(status) &&
        !foto
      ) {
        showModal(
          "📷",
          "Foto Belum Diambil",
          "Silakan ambil foto terlebih dahulu."
        );
        return;
      }
      const now = new Date();

      const jam = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const data: Presensi = {
        mahasiswaId: mahasiswa.id,
        matkulId: String(matkulId),
        pertemuanId: String(pertemuanId),

        tanggal: now.toLocaleDateString("sv-SE"),
        jam: jam,

        status,
        alasan,
        fotoBukti: foto,
      };

setJamAbsen(jam);

await simpanPresensi(data);

      showModal(
        "✅",
        "Presensi Berhasil",
        "Data presensi berhasil disimpan.",
        true
      );

      return;
    } catch (e) {
      console.log(e);

      showModal(
        "❌",
        "Gagal Menyimpan",
        "Terjadi kesalahan saat menyimpan data."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!mahasiswa) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {}
        <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/dashboard")}
          >
            <Feather
              name="arrow-left"
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>

            <Text style={styles.headerTitle}>
              Detail Absensi
            </Text>
        </View>
      </View>

        {}

        <View style={styles.profileCard}>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {mahasiswa.nama.charAt(0)}
            </Text>
          </View>

          <Text style={styles.nama}>
            {mahasiswa.nama}
          </Text>

          <Text style={styles.nim}>
            NIM • {mahasiswa.nim}
          </Text>

        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            📚 Mahasiswa Aktif
          </Text>
        </View>

        {}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Status Kehadiran
          </Text>

          <Text style={styles.sectionDesc}>
            Pilih status mahasiswa
          </Text>

          <View style={styles.optionContainer}>

            {[
              "Hadir",
              "Telat",
              "Izin",
            ].map((item) => (

              <TouchableOpacity
                key={item}
                style={[
                  styles.statusCard,
                  status === item &&
                    styles.statusCardActive,
                ]}
                onPress={() =>
                  setStatus(item as StatusPresensi)
                }
              >

                <Text
                  style={[
                    styles.statusTitle,
                    status === item && {
                      color: "#fff",
                    },
                  ]}
                >
                  {item}
                </Text>

              </TouchableOpacity>

            ))}

          </View>

          {["Telat", "Izin"].includes(status) && (

            <>

              <Text style={styles.inputTitle}>
                Alasan
              </Text>

              <TextInput
                style={styles.input}
                value={alasan}
                onChangeText={setAlasan}
                multiline
                placeholder="Masukkan alasan..."
              />

            </>

          )}

          {["Hadir", "Telat"].includes(status) && (

            <TouchableOpacity
              style={styles.cameraCard}
              onPress={ambilFoto}
            >

              <Text style={{ fontSize: 45 }}>
                📷
              </Text>

              <Text style={styles.cameraTitle}>
                Ambil Foto Bukti
              </Text>
              {foto !== "" && (
                <Image
                  source={{ uri: foto }}
                  style={{
                    width: "100%",
                    height: 220,
                    borderRadius: 20,
                    marginTop: 20,
                  }}
                />
              )}

              <Text style={styles.cameraSubtitle}>
                Foto wajib diambil sebelum
                presensi disimpan.
              </Text>

            </TouchableOpacity>

          )}

        </View>

        {status !== "Belum" && (

          <View style={styles.successCard}>

            <Text style={styles.successTitle}>
              ✅ Data Presensi
            </Text>

            <View style={styles.successRow}>
              <Text>Status</Text>

              <Text
                style={{
                  fontWeight: "700",
                  color: "#16A34A",
                }}
              >
                {status}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.successRow}>
              <Text>Jam</Text>

              <Text>
               {jamAbsen}
              </Text>

            </View>

          </View>

        )}
        <TouchableOpacity
          style={[
            styles.saveButton,
            loading && { opacity: 0.6 },
          ]}
          disabled={loading}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>
            {loading ? "Menyimpan..." : "Simpan Presensi"}
          </Text>
        </TouchableOpacity>

        <Modal
        visible={modalData.visible}
        transparent
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "82%",
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 25,
              alignItems: "center",
            }}
          >
           <Text
            style={{
              fontSize: 55,
              marginBottom: 10,
            }}
          >
            {modalData.icon}
          </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 10,
              }}
            >
              {modalData.title}
            </Text>

            <Text
              style={{
                textAlign: "center",
                color: "#64748B",
                marginBottom: 20,
              }}
            >
              {modalData.message}
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: "#F8FAFC",
                borderRadius: 15,
                padding: 15,
                marginBottom: 20,
              }}
            >
              <Text style={{ fontWeight: "700" }}>
                Status : {status}
              </Text>

              <Text style={{ marginTop: 8 }}>
                Waktu : {jamAbsen}
              </Text>

              {foto !== "" && (
                <Image
                  source={{ uri: foto }}
                  style={{
                    width: "100%",
                    height: 220,
                    borderRadius: 15,
                    marginTop: 15,
                  }}
                  resizeMode="cover"
                />
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                setModalData({
                  ...modalData,
                  visible: false,
                });

                router.back();
              }}
              style={{
                width: "100%",
                height: 55,
                backgroundColor: "#2563EB",
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 17,
                  fontWeight: "700",
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      </ScrollView>
      );
      }

      const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
  },

  content: {
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#4F46E5",
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 65,
    borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
            },
            headerTop: {
              flexDirection: "row",
              alignItems: "center",
            },

            headerText: {
              marginLeft: 12,
              flex: 1,
            },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },


  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  profileCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 42,
    fontWeight: "700",
    color: "#2563EB",
  },

  nama: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  nim: {
    marginTop: 8,
    color: "#64748B",
  },

  badge: {
    alignSelf: "center",
    marginTop: 18,
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
  },

  badgeText: {
    color: "#2563EB",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 22,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  sectionDesc: {
    color: "#64748B",
    marginTop: 5,
    marginBottom: 20,
  },

  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statusCard: {
    width: "48%",
    height: 90,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  statusCardActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  statusTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  inputTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "700",
    fontSize: 17,
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 18,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    textAlignVertical: "top",
  },

  cameraCard: {
    marginTop: 25,
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#60A5FA",
  },

  cameraTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E3A8A",
  },

  cameraSubtitle: {
    marginTop: 8,
    color: "#64748B",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  successCard: {
    backgroundColor: "#ECFDF5",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },

  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 18,
    textAlign: "center",
  },

  successRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#BBF7D0",
    marginVertical: 10,
  },

  saveButton: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 40,
    backgroundColor: "#2563EB",
    borderRadius: 18,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});