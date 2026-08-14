import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { getRekapById, RekapLengkap } from "@/services/rekapService";

export default function RekapDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [data, setData] = useState<RekapLengkap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      if (!id) return;
      const result = await getRekapById(String(id));
      setData(result);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Data tidak ditemukan.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/(tabs)/rekap")}
          >
            <Feather
              name="arrow-left"
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              {data.nama}
            </Text>

          </View>
        </View>
      </View>

        {/* Informasi Mata Kuliah */}
        <View style={styles.card}>
          <Text style={styles.nama}>{data.nama}</Text>
          <Text style={styles.dosen}>{data.dosen}</Text>

          <View style={styles.infoRow}>
            <Feather name="calendar" size={16} color="#2563EB" />
            <Text style={styles.info}>{data.hari}</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="clock" size={16} color="#2563EB" />
            <Text style={styles.info}>{data.jam}</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="map-pin" size={16} color="#2563EB" />
            <Text style={styles.info}>{data.ruangan}</Text>
          </View>
        </View>

        {/* Statistik */}
        <Text style={styles.section}>Statistik Kehadiran</Text>

        <View style={styles.statContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{data.statistik.persen}%</Text>
            <Text style={styles.statLabel}>Kehadiran</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{data.statistik.hadir}</Text>
            <Text style={styles.statLabel}>Hadir</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{data.statistik.tidakHadir}</Text>
            <Text style={styles.statLabel}>Tidak Hadir</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{data.statistik.pertemuan}</Text>
            <Text style={styles.statLabel}>Pertemuan</Text>
          </View>
        </View>

        {/* Daftar Pertemuan */}
        {data.meetings.length === 0 ? (
            <View style={styles.empty}>
              <Feather name="book-open" size={45} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>Belum ada data pertemuan</Text>
              <Text style={styles.emptyText}>
                Belum ada data pertemuan.
              </Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator>
              <View style={styles.tableContainer}>
                {/* Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerCell, { width: 45 }]}>No</Text>
                  <Text style={[styles.headerCell, { width: 100 }]}>Pertemuan</Text>
                  <Text style={[styles.headerCell, { width: 110 }]}>Tanggal</Text>
                  <Text style={[styles.headerCell, { width: 220 }]}>Materi</Text>
                  <Text style={[styles.headerCell, { width: 65 }]}>H</Text>
                  <Text style={[styles.headerCell, { width: 65 }]}>T</Text>
                  <Text style={[styles.headerCell, { width: 65 }]}>I</Text>
                  <Text style={[styles.headerCell, { width: 65 }]}>S</Text>
                  <Text style={[styles.headerCell, { width: 65 }]}>A</Text>
                  <Text style={[styles.headerCell, { width: 70 }]}>%</Text>
                  <Text style={[styles.headerCell, { width: 120 }]}>Aksi</Text>
                </View>

                {data.meetings.map((meeting: any, index: number) => (
                  <View key={meeting.id} style={styles.tableRow}>
                    <Text style={[styles.bodyCell, { width: 45 }]}>
                      {index + 1}
                    </Text>

                    <Text style={[styles.bodyCell, { width: 100 }]}>
                      P{meeting.pertemuan}
                    </Text>

                    <Text style={[styles.bodyCell, { width: 110 }]}>
                      {meeting.tanggal}
                    </Text>

                    <Text
                      numberOfLines={2}
                      style={[styles.bodyCell, { width: 220 }]}
                    >
                      {meeting.materi}
                    </Text>

                    <Text style={[styles.bodyCell, { width: 65 }]}>
                      {meeting.hadir}
                    </Text>

                    <Text style={[styles.bodyCell, { width: 65 }]}>
                      {meeting.telat}
                    </Text>

                    <Text style={[styles.bodyCell, { width: 65 }]}>
                      {meeting.izin}
                    </Text>

                    <Text style={[styles.bodyCell, { width: 65 }]}>
                      {meeting.sakit}
                    </Text>

                    <Text style={[styles.bodyCell, { width: 65 }]}>
                      {meeting.tidakHadir}
                    </Text>

                    <Text style={[styles.bodyCell, { width: 70 }]}>
                      {meeting.persentase}%
                    </Text>

                    <TouchableOpacity
                      style={styles.detailButton}
                      onPress={() =>
                        router.push({
                          pathname: "/rekap/pertemuan/[id]",
                          params: { id: meeting.id },
                        })
                      }
                    >
                      <Text style={styles.detailText}>
                        Lihat Detail
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

                </ScrollView>
              </SafeAreaView>
            );
          }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

header: {
  backgroundColor: "#4F46E5", // sama seperti Rekap Absensi
  paddingTop: 24,
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
  marginLeft: 16,
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
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
  },
  

  card:{
  marginHorizontal:20,
  marginTop:-50,      // <- ini yang bikin card naik
  marginBottom:16,

  backgroundColor:"#FFF",
  borderRadius:24,
  padding:22,

  elevation:5,
  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:10,
},

  nama: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 5,
  },

  dosen: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  info: {
    marginLeft: 10,
    fontSize: 14,
    color: "#374151",
  },

  section: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },

  statContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2563EB",
  },

  statLabel: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
  },
    tableContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    height: 48,
  },

  headerCell: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 8,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },

  bodyCell: {
    fontSize: 13,
    color: "#374151",
    textAlign: "center",
    paddingHorizontal: 8,
  },

  detailButton: {
    width: 100,
    height: 36,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  detailText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  emptyText: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});