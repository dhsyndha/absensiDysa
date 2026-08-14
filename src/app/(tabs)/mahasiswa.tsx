import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  getSemuaMahasiswa,
  getMahasiswaByMatkul,
} from "@/services/mahasiswaService";

import { useLocalSearchParams } from "expo-router";
import { Mahasiswa as MahasiswaType } from "@/types/Mahasiswa";

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

export default function MahasiswaScreen() {
const [search, setSearch] = useState("");
const [mahasiswa, setMahasiswa] = useState<MahasiswaType[]>([]);

const { matkulId } = useLocalSearchParams<{
  matkulId?: string;
}>();

  useEffect(() => {
  loadMahasiswa();
}, [matkulId]);

async function loadMahasiswa() {
  let data: MahasiswaType[];

  if (matkulId) {
    data = await getMahasiswaByMatkul(String(matkulId));
  } else {
    data = await getSemuaMahasiswa();
  }

  setMahasiswa(data);
}

  const filtered = mahasiswa.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nim.includes(search)
  );

  return (
    <View style={styles.container}>

  <View style={styles.header}>
    <View style={styles.headerTop}>

      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>
          {matkulId
            ? "Mahasiswa Mata Kuliah"
            : "Daftar Mahasiswa"}
        </Text>

        <Text style={styles.headerSubtitle}>
          {mahasiswa.length} Mahasiswa Terdaftar
        </Text>
      </View>

    </View>
  </View>

  <View style={styles.topCard}>

      <Text style={styles.totalMahasiswa}>
        👥 Total Mahasiswa : {mahasiswa.length}
      </Text>

      <View style={styles.searchBox}>
        <FontAwesome5
          name="search"
          size={16}
          color="#64748B"
        />

        <TextInput
          placeholder="Cari mahasiswa..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <FontAwesome5
                name="user"
                size={22}
                color="#2563EB"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.nama}>{item.nama}</Text>

              <Text style={styles.info}>
                NIM : {item.nim}
              </Text>

              <Text style={styles.info}>
                No. HP : {item.noHp}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
  backgroundColor: "#4F46E5",
  paddingTop: 20,
  paddingBottom: 35,
  borderBottomLeftRadius: 23,
  borderBottomRightRadius: 23,
},

headerTop: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 4,
},

headerText: {
  marginLeft: 45,
  marginTop: 15,
  flex: 1,
},

headerTitle: {
  fontSize: 28,
  fontWeight: "700",
  color: "#FFF",
},

headerSubtitle: {
  marginTop: 4,
  fontSize: 15,
  color: "#DBEAFE",
},

topCard: {
  flex: 1,

  marginHorizontal: 20,
  marginTop: -33,
  backgroundColor: "#FFF",
  borderRadius: 28,

  padding: 20,
},
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",

  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 18,
    color: "#0F172A",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
  },

  input: {
    flex: 1,
    padding: 14,
    marginLeft: 8,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  nama: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  nim: {
    color: "#64748B",
    marginTop: 3,
  },
  info: {
  fontSize: 13,
  color: "#64748B",
  marginTop: 2,
},
totalMahasiswa: {
  fontSize: 15,
  color: "#64748B",
  fontWeight: "600",
  marginTop: -10,
  marginBottom: 18,
},
});