import { ScrollView, StyleSheet } from "react-native";

import RekapCourseCard from "@/components/rekap/RekapCourseCard";
import RekapFilter from "@/components/rekap/RekapFilter";
import RekapHeader from "@/components/rekap/RekapHeader";

import { dataSemester } from "@/data/semester";
import { useUser } from "@/hooks/useUser";

import {
  getRekapLengkap,
  RekapLengkap,
} from "@/services/rekapService";

import { useEffect, useState } from "react";

export default function RekapScreen() {
  const user = useUser();

  const [semesterId, setSemesterId] = useState("SEM4");
  const [matkulId, setMatkulId] = useState("semua");

  const [rekapData, setRekapData] =
    useState<RekapLengkap[]>([]);


  useEffect(() => {
    async function loadRekap() {
      try {
        const data = await getRekapLengkap();

        setRekapData(data);

      } catch (error) {
        console.log(
          "Gagal mengambil rekap:",
          error
        );
      }
    }

    if (user) {
      loadRekap();
    }
  }, [user]);

  const semesterAngka = Number(
    semesterId.replace("SEM", "")
  );

  // Filter semester
  const dataSemesterFilter =
  semesterId === "SEM4"
    ? rekapData
    : [];

  // Kalau mahasiswa → hanya matkul yang dia ambil
const dataMahasiswaFilter = dataSemesterFilter;

  // Filter mata kuliah
  const dataTampil =
    matkulId === "semua"
      ? dataMahasiswaFilter
      : dataMahasiswaFilter.filter(
          (item) => item.id === matkulId
        );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <RekapHeader />

        <RekapFilter
          semesterId={semesterId}
          setSemesterId={(value) => {
            setSemesterId(value);
            setMatkulId("semua");
          }}
          matkulId={matkulId}
          setMatkulId={setMatkulId}
        />
      {dataTampil.map((item) => (
        <RekapCourseCard
          key={item.id}
          item={item}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    paddingBottom: 30,
  },
});