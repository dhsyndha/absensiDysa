import { getMahasiswaByMatkul } from "@/services/mahasiswaService";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { getSemuaMatkul } from "@/services/matkulService";
import { MataKuliah as MataKuliahType } from "@/types/MataKuliah";
import { useEffect, useState } from "react";

export default function MataKuliahScreen() {
  type MataKuliahView = MataKuliahType & {
  jumlahMahasiswa: number;
};

const [semuaMatkul, setSemuaMatkul] =
  useState<MataKuliahView[]>([]);

const [showMahasiswa, setShowMahasiswa] = useState(false);

const [selectedMatkul, setSelectedMatkul] =
  useState<MataKuliahView | null>(null);

const [listMahasiswa, setListMahasiswa] =
  useState<any[]>([]);

  const hari = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
useEffect(() => {
  loadMatkul();
}, []);

async function loadMatkul() {
  const data = await getSemuaMatkul();

  const hasil = await Promise.all(
    data.map(async (item) => {
      const mahasiswa = await getMahasiswaByMatkul(item.id);

      return {
        ...item,
        jumlahMahasiswa: mahasiswa.length,
      };
    })
  );

  setSemuaMatkul(hasil);
}
 async function bukaDaftarMahasiswa(item: MataKuliahView) {
    const data = await getMahasiswaByMatkul(item.id);

    setSelectedMatkul(item);
    setListMahasiswa(data);
    setShowMahasiswa(true);
  }
const hariSekarang = hari[new Date().getDay()];

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
const nowMinutes = now.getHours() * 60 + now.getMinutes();

const getStatus = (item: any) => {
  const indexHari = hari.indexOf(item.hari);
  const indexSekarang = hari.indexOf(hariSekarang);

  if (indexHari > indexSekarang) {
    if (indexHari - indexSekarang === 1) {
      return {
        text: "📅 Dimulai Besok",
        color: "#2563EB",
      };
    }

    return {
      text: `📅 Dimulai Hari ${item.hari}`,
      color: "#7C3AED",
    };
  }

  if (indexHari < indexSekarang) {
    return {
      text: "🔴 Sudah Selesai",
      color: "#6B7280",
    };
  }

  if (nowMinutes < toMinutes(item.jam)) {
    return {
      text: "🟡 Belum Dimulai",
      color: "#F59E0B",
    };
  }

  if (
    nowMinutes >= toMinutes(item.jam) &&
    nowMinutes < endMinutes(item.jam)
  ) {
    return {
      text: "🟢 Sedang Berlangsung",
      color: "#22C55E",
    };
  }

  return {
    text: "🔴 Sudah Selesai",
    color: "#6B7280",
  };
};

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false} >

    <LinearGradient
      colors={["#4338CA", "#4F46E5", "#5B4CF6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        <View style={{ flex: 1, marginLeft: 18 }}>
          <Text style={styles.headerTitle}>
            Mata Kuliah
          </Text>

          <Text style={styles.headerSubtitle}>
            Kelola seluruh mata kuliah
          </Text>
        </View>

      </View>
    </LinearGradient>

      {semuaMatkul.length === 0 ? (
  <View
    style={{
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
    }}
  >
    <FontAwesome5
      name="calendar-times"
      size={50}
      color="#94A3B8"
    />

    <Text
      style={{
        fontSize: 18,
        fontWeight: "700",
        marginTop: 15,
        color: "#334155",
      }}
    >
      Tidak Ada Jadwal Hari Ini
    </Text>

    <Text
      style={{
        color: "#64748B",
        marginTop: 6,
        textAlign: "center",
      }}
    >
      Silakan cek kembali jadwal pada hari berikutnya.
    </Text>
  </View>
) : (
    semuaMatkul.map((item) => {
      const status = getStatus(item);

      let progress = 0;

      if (status.text === "🟢 Sedang Berlangsung") {
        const mulai = toMinutes(item.jam);
        const selesai = endMinutes(item.jam);

        progress =
          ((nowMinutes - mulai) / (selesai - mulai)) * 100;

        progress = Math.max(0, Math.min(progress, 100));
      } else if (status.text === "🔴 Sudah Selesai") {
        progress = 100;
      }

    return (
      <View key={item.id} style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <FontAwesome5
              name="book-open"
              size={22}
              color="#2563EB"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.nama}>{item.nama}</Text>
            <Text style={styles.dosen}>{item.dosen}</Text>
          </View>
        </View>

        <Text style={styles.hari}>
          📅 {item.hari}
        </Text>

        <View style={styles.infoRow}>
          <FontAwesome5
            name="clock"
            size={15}
            color="#64748B"
          />
          <Text style={styles.info}>{item.jam}</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome5
            name="map-marker-alt"
            size={15}
            color="#64748B"
          />
          <Text style={styles.info}>{item.ruang}</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome5
            name="users"
            size={15}
            color="#64748B"
          />
          <Text style={styles.info}>
            {item.jumlahMahasiswa} Mahasiswa
          </Text>
        </View>

        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: status.color },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              { color: status.color },
            ]}
          >
            {status.text}
          </Text>
        </View>

        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor:
                status.text === "🟢 Sedang Berlangsung"
                  ? "#22C55E" 
                  : status.text === "🔴 Sudah Selesai"
                  ? "#2563EB" 
                  : "#E2E8F0", 
            },
          ]}
        />

        <TouchableOpacity
            style={styles.button}
            onPress={() => bukaDaftarMahasiswa(item)}
          >
          <Text style={styles.buttonText}>
            Buka Daftar Mahasiswa
          </Text>
        </TouchableOpacity>
      </View>
    );
  })
)}

<Modal
  visible={showMahasiswa}
  transparent
  animationType="slide"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>

      <Text style={styles.modalTitle}>
        {selectedMatkul?.nama}
      </Text>

      <Text style={styles.modalSub}>
        👥 {listMahasiswa.length} Mahasiswa
      </Text>

      <FlatList
        data={listMahasiswa}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.modalItem}>

            <View style={{ flex: 1 }}>
              <Text style={styles.modalNama}>
                {index + 1}. {item.nama}
              </Text>

              <Text style={styles.modalNim}>
                {item.nim}
              </Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setShowMahasiswa(false)}
      >
        <Text style={styles.closeText}>
          Tutup
        </Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
headerContainer: {
  paddingHorizontal: 22,
  paddingBottom: 35,

  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,

  marginBottom: 18,
},

headerContent: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 28,
},

headerTitle: {
  fontSize: 31,
  fontWeight: "700",
  color: "#FFFFFF",
},

headerSubtitle: {
  marginTop: 4,
  marginBottom: 10,
  fontSize: 14,
  color: "#E5E7EB",
},

  header: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#2563EB",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  nama: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  dosen: {
    marginTop: 4,
    color: "#64748B",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  info: {
    marginLeft: 10,
    color: "#475569",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 12,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  statusText: {
    marginLeft: 10,
    fontWeight: "600",
    color: "#334155",
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    marginTop: 18,
    overflow: "hidden",
  },

  progressFill: {
    height: 10,
    backgroundColor: "#2563EB",
    borderRadius: 20,
  },

  progressText: {
    marginTop: 10,
    color: "#64748B",
    fontWeight: "600",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  hari: {
  marginTop: 4,
  fontSize: 14,
  color: "#2563EB",
  fontWeight: "600",
},

modalOverlay:{
  flex:1,
  backgroundColor:"rgba(0,0,0,.4)",
  justifyContent:"flex-end",
},

modalContent:{
  backgroundColor:"#fff",
  borderTopLeftRadius:28,
  borderTopRightRadius:28,
  padding:20,
  maxHeight:"75%",
},

modalTitle:{
  fontSize:22,
  fontWeight:"700",
  color:"#0F172A",
},

modalSub:{
  color:"#64748B",
  marginTop:5,
  marginBottom:20,
},

modalItem:{
  flexDirection:"row",
  alignItems:"center",
  paddingVertical:12,
  borderBottomWidth:1,
  borderBottomColor:"#F1F5F9",
},

modalNama:{
  fontWeight:"700",
  fontSize:16,
},

modalNim:{
  color:"#64748B",
  marginTop:3,
},

closeButton:{
  marginTop:20,
  backgroundColor:"#2563EB",
  paddingVertical:14,
  borderRadius:15,
  alignItems:"center",
},

closeText:{
  color:"#fff",
  fontWeight:"700",
},
});