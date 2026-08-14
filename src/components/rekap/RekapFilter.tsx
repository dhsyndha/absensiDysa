import { Feather } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getSemuaMatkul } from "@/services/matkulService";
import { MataKuliah } from "@/types/MataKuliah";
import { dataSemester } from "@/data/semester";


interface RekapFilterProps {
  semesterId: string;
  setSemesterId: (value: string) => void;

  matkulId: string;
  setMatkulId: (value: string) => void;

  allowedMatkulIds?: string[];
}

export default function RekapFilter({
  semesterId,
  setSemesterId,
  matkulId,
  setMatkulId,
  allowedMatkulIds,
}: RekapFilterProps) {
  const semester = useMemo(
    () =>
      dataSemester.find((item) => item.id === semesterId) ??
      dataSemester[0],
    [semesterId]
  );

const [matkul, setMatkul] = useState<MataKuliah[]>([]);

useEffect(() => {
  async function loadMatkul() {
    const data = await getSemuaMatkul();
    setMatkul(data);
  }

  loadMatkul();
}, []);

const semesterKeAngka: Record<string, number> = {
  SEM1: 1,
  SEM2: 2,
  SEM3: 3,
  SEM4: 4,
  SEM5: 5,
  SEM6: 6,
  SEM7: 7,
  SEM8: 8,
};

const matkulFilter = matkul.filter((item) => {
  const sesuaiSemester =
    Number(item.semester) ===
    semesterKeAngka[semesterId];

  const sesuaiMahasiswa =
    !allowedMatkulIds ||
    allowedMatkulIds.includes(item.id);

  return sesuaiSemester && sesuaiMahasiswa;
});

const semesterAktif = 4;

let statusSemester = "";

if (Number(semesterId.replace("SEM", "")) < semesterAktif) {
  statusSemester = "Semester Selesai";
} else if (Number(semesterId.replace("SEM", "")) === semesterAktif) {
  statusSemester = "Semester Aktif";
} else {
  statusSemester = "Belum Dimulai";
}

  return (
<View style={styles.container}>
  <View style={styles.row}>
    {/* Semester */}
    <View style={styles.column}>
      <Text style={styles.label}>Semester</Text>

      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        itemTextStyle={styles.itemText}
        iconStyle={styles.iconStyle}
        data={dataSemester.map((item) => ({
          label: item.nama,
          value: item.id,
        }))}
        labelField="label"
        valueField="value"
        value={semesterId}
        onChange={(item) => setSemesterId(item.value)}
        renderLeftIcon={() => (
          <Feather
            name="calendar"
            size={20}
            color="#6D5DF6"
            style={{ marginRight: 10, }}
          />
        )}
      />
    </View>

        {/* Mata Kuliah */}
    <View style={styles.column}>
  <Text style={styles.label}>Pilih Mata Kuliah</Text>

  <Dropdown
    style={styles.dropdown}
    containerStyle={styles.dropdownContainer}
    placeholderStyle={styles.placeholder}
    selectedTextStyle={styles.selectedText}
    itemTextStyle={styles.itemText}
    iconStyle={styles.iconStyle}
    data={[
      {
        label: "Semua Mata Kuliah",
        value: "semua",
      },
      ...matkulFilter.map((item) => ({
        label: item.nama,
        value: item.id,
      })),
    ]}
    labelField="label"
    valueField="value"
    value={matkulId}
    onChange={(item) => setMatkulId(item.value)}
    renderLeftIcon={() => (
      <Feather
        name="book-open"
        size={20}
        color="#6D5DF6"
        style={{ marginRight: 10, marginTop: 5, }}
      />
    )}
  />
</View>

  </View>

  <Text style={styles.periodLabel}>
    Periode
  </Text>

  <View style={styles.periodCard}>
    <View style={styles.periodIcon}>
      <Feather
        name="calendar"
        size={26}
        color="#6D5DF6"
      />
    </View>

    <View style={styles.separator} />

    <View style={styles.periodInfo}>
      <Text style={styles.periodDate}>
        {semester.nama}
      </Text>

      <Text style={styles.periodDesc}>
        {statusSemester}
      </Text>
    </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: -35,
    borderRadius: 28,
    padding: 22,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 6,
  },

  row: {
    flexDirection: "row",
    gap: 16,
  },

  column: {
    flex: 1,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 10,
  },

  dropdown: {
  height: 66,
  borderRadius: 20,
  backgroundColor: "#FAFAFF",
  borderWidth: 1,
  borderColor: "#E9E5FF",
  paddingHorizontal: 16,
},

dropdownContainer: {
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "#E9E5FF",

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 16,
  shadowOffset: {
    width: 0,
    height: 5,
  },

  elevation: 8,
},

selectedText: {
  fontSize: 17,
  fontWeight: "600",
  color: "#1E293B",
},

placeholder: {
  fontSize: 17,
  color: "#94A3B8",
},

itemText: {
  fontSize: 16,
  color: "#334155",
},

iconStyle: {
  width: 20,
  height: 20,
},

  periodLabel: {
    marginTop: 24,
    marginBottom: 12,

    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },

  periodCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FAFAFF",

    borderRadius: 22,

    borderWidth: 1.5,
    borderColor: "#E9E5FF",

    padding: 18,
  },

  periodIcon: {
    width: 62,
    height: 62,

    borderRadius: 18,

    backgroundColor: "#EEF2FF",

    justifyContent: "center",
    alignItems: "center",
  },

  separator: {
    width: 1,
    height: 48,
    backgroundColor: "#DDD6FE",
    marginHorizontal: 18,
  },

  periodInfo: {
    flex: 1,
  },

  periodDate: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },

  periodDesc: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
  },
});