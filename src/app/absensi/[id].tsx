import { getSemuaMahasiswa } from "@/services/mahasiswaService";
import { getMahasiswaByMatkul } from "@/services/mahasiswaService";
import { getMatkulById } from "@/services/matkulService";
import { getPresensiByMatkul } from "@/services/presensiService";
import { materiMatkul } from "@/data/materiMatkul";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { TextInput, Alert } from "react-native";
import { buatAtauAmbilPertemuan } from "@/services/pertemuanService";
import { Mahasiswa as MahasiswaType } from "@/types/Mahasiswa";
import { MataKuliah as MataKuliahType } from "@/types/MataKuliah";
import { canEditPresensi } from "@/services/permissionService";
import { useUser } from "@/hooks/useUser";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AbsensiScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useUser();
  const [matkul, setMatkul] = useState<MataKuliahType | null>(null);
  const [mahasiswa, setMahasiswa] = useState<MahasiswaType[]>([]);
  const [presensi, setPresensi] = useState<any[]>([]);
  const [pertemuanId, setPertemuanId] = useState("");

  useFocusEffect(
  useCallback(() => {
    if (id) {
      loadData();
    }
  }, [id])
);

async function loadData() {
  const dataMatkul = await getMatkulById(String(id));

  if (dataMatkul) {
    setMatkul(dataMatkul);
  }

  const dataMhs = await getMahasiswaByMatkul(String(id));
  const pertemuan = await buatAtauAmbilPertemuan(String(id));
    setPertemuanId(pertemuan.id);

    const dataPresensi = await getPresensiByMatkul(
      String(id),
      pertemuan.id
    );

  setMahasiswa(dataMhs);
  setPresensi(dataPresensi);
}


  if (!matkul) {
    return (
      <View style={styles.center}>
        <Text>Mata kuliah tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/dashboard")}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          {matkul.nama}
        </Text>

        <Text style={styles.subtitle}>
          {matkul.hari} • {matkul.jam}
        </Text>

        <Text style={styles.subtitle}>
          {matkul.ruang}
        </Text>
      </View>

      <FlatList
        data={mahasiswa}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const data = presensi.find(
            (p) => p.mahasiswaId === item.id
          );

          const status = data?.status ?? "Belum";
          const bisaKlik =
            canEditPresensi(user) ||
            item.id === user?.refId;
          return (
            <Pressable
                disabled={!bisaKlik}
                style={[
                  styles.card,
                  !bisaKlik && { opacity: 0.6 },
                ]}
                onPress={async () => {
                let idPertemuan = pertemuanId;

                if (!idPertemuan) {
                  const hasil = await buatAtauAmbilPertemuan(String(id));
                  idPertemuan = hasil.id;
                  setPertemuanId(hasil.id);
                }

                router.push({
                  pathname: "/absensi/detail/[mahasiswaId]",
                  params: {
                    mahasiswaId: item.id,
                    matkulId: id,
                    pertemuanId: idPertemuan,
                  },
                });
              }}
              >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.nama.substring(0, 1)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.nama}>
                  {item.nama}
                </Text>

                <Text style={styles.nim}>
                  {item.nim}
                </Text>
              </View>

              <View
                style={[
                  styles.badge,
                  status === "Belum" && styles.belum,
                  status === "Hadir" && styles.hadir,
                  status === "Telat" && styles.telat,
                  status === "Izin" && { backgroundColor: "#DBEAFE" },
                  status === "Sakit" && { backgroundColor: "#FECACA" },
                  status === "Berduka" && { backgroundColor: "#E9D5FF" },
                  status === "Alfa" && { backgroundColor: "#FCA5A5" },
                ]}
              >
                <Text style={styles.badgeText}>
                  {status}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#2563EB",
    padding: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  backButton: {
    marginBottom: 16,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  subtitle: {
    color: "#DBEAFE",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
  },

  nama: {
    fontSize: 16,
    fontWeight: "700",
  },

  nim: {
    color: "#64748B",
    marginTop: 3,
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 30,
  },

  badgeText: {
    fontWeight: "700",
  },

  belum: {
    backgroundColor: "#E2E8F0",
  },

  hadir: {
    backgroundColor: "#DCFCE7",
  },

  telat: {
    backgroundColor: "#FEF3C7",
  },
});