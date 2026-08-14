import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";


import { getRekapLengkap } from "@/services/rekapService";

export default function DetailPertemuan() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [meeting, setMeeting] = useState<any>(null);
  const [selectedMahasiswa, setSelectedMahasiswa] =
  useState<any>(null);

  const [modalVisible, setModalVisible] =
  useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const semua = await getRekapLengkap();

    for (const mk of semua) {
      const item = mk.meetings.find(
        (m) => m.id === id
      );

      if (item) {
        setMeeting(item);
        break;
      }
    }
  }

  if (!meeting) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const isExam =
    meeting.materi === "UTS" ||
    meeting.materi === "UAS";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
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
            <Text style={styles.title}>
              {meeting.namaMK}
            </Text>

            <Text style={styles.dosen}>
              {meeting.dosen}
            </Text>
          </View>
        </View>
      </View>
        

        <View style={styles.Topcard}>
          <Text style={styles.pertemuan}>
            Pertemuan {meeting.pertemuan}
          </Text>

          <Text style={styles.materi}>
            {meeting.materi}
          </Text>

          <View style={styles.infoRow}>
            <Feather
              name="calendar"
              size={16}
              color="#2563EB"
            />

            <Text style={styles.info}>
              {meeting.tanggal}
            </Text>
          </View>
        </View>

        {isExam ? (
          <View style={styles.examCard}>

            <Text style={styles.examIcon}>
              {meeting.materi === "UTS"
                ? "📝"
                : "🎓"}
            </Text>

            <Text style={styles.examTitle}>
              {meeting.materi}
            </Text>

            <Text style={styles.examDesc}>
              {meeting.materi === "UTS"
                ? "Hari ini merupakan jadwal Ujian Tengah Semester."
                : "Hari ini merupakan jadwal Ujian Akhir Semester."}
            </Text>

            <Text style={styles.examDesc}>
              Tidak terdapat materi
              perkuliahan maupun rekap
              kehadiran reguler.
            </Text>

          </View>
        ) : (
          <>
            <View style={styles.normalCard}>

              <Text style={styles.section}>
                Statistik
              </Text>

              <View style={styles.statRow}>
                <Text>
                  👥 Total Mahasiswa
                </Text>

                <Text>
                  {meeting.totalMahasiswa}
                </Text>
              </View>

              <View style={styles.statRow}>
                <Text>✅ Hadir</Text>

                <Text>{meeting.hadir}</Text>
              </View>

              <View style={styles.statRow}>
                <Text>🟡 Telat</Text>

                <Text>{meeting.telat}</Text>
              </View>

              <View style={styles.statRow}>
                <Text>🔵 Izin</Text>

                <Text>{meeting.izin}</Text>
              </View>

              <View style={styles.statRow}>
                <Text>🟠 Sakit</Text>

                <Text>{meeting.sakit}</Text>
              </View>

              <View style={styles.statRow}>
                <Text>🔴 Alfa</Text>

                <Text>{meeting.tidakHadir}</Text>
              </View>

              <View style={styles.statRow}>
                <Text>
                  Persentase
                </Text>

                <Text>
                  {meeting.persentase}%
                </Text>
              </View>

            </View>

            <View style={styles.normalCard}>

              <Text style={styles.section}>
                Daftar Mahasiswa
              </Text>

              <ScrollView
                  style={styles.studentList}
                  showsVerticalScrollIndicator
                  nestedScrollEnabled
                >
                  {meeting.mahasiswa.map((mhs: any) => (
                  <TouchableOpacity
                      key={mhs.id}
                      style={styles.studentRow}
                      onPress={() => {
                        setSelectedMahasiswa(mhs);
                        setModalVisible(true);
                      }}
                    >

                    <Text style={styles.studentName}>
                      {mhs.nama}
                    </Text>

                    <View
                      style={[
                        styles.badge,
                        mhs.status === "Hadir"
                          ? styles.hadir
                          : mhs.status === "Telat"
                          ? styles.telat
                          : mhs.status === "Izin"
                          ? styles.izin
                          : mhs.status === "Sakit"
                          ? styles.sakit
                          : mhs.status === "Alfa"
                          ? styles.alfa
                          : styles.belum,
                      ]}
                    >
                      <Text style={styles.badgeText}>
                        {mhs.status}
                      </Text>
                    </View>

                  </TouchableOpacity>
                ))}
              </ScrollView>

            </View>
                    </>
                  )}

                  </ScrollView>

                    <Modal
                      visible={modalVisible}
                      transparent
                      animationType="slide"
                    >
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          justifyContent: "center",
                          padding: 20,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            padding: 20,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 22,
                              fontWeight: "700",
                            }}
                          >
                            {selectedMahasiswa?.nama}
                          </Text>

                          <Text style={{ marginTop: 10 }}>
                            Status : {selectedMahasiswa?.status}
                          </Text>
                          {selectedMahasiswa?.jam ? (
                          <Text style={{ marginTop: 8 }}>
                            🕒 Jam : {selectedMahasiswa.jam}
                          </Text>
                        ) : null}

                          {selectedMahasiswa?.alasan ? (
                            <Text style={{ marginTop: 10 }}>
                              Alasan : {selectedMahasiswa.alasan}
                            </Text>
                          ) : null}

                          {selectedMahasiswa?.fotoBukti ? (
                            <Image
                              source={{ uri: selectedMahasiswa.fotoBukti }}
                              style={{
                                width: "100%",
                                height: 220,
                                borderRadius: 15,
                                marginTop: 15,
                              }}
                            />
                          ) : null}

                          <TouchableOpacity
                            style={{
                              marginTop: 20,
                              backgroundColor: "#4F46E5",
                              paddingVertical: 14,
                              borderRadius: 12,
                              alignItems: "center",
                            }}
                            onPress={() => setModalVisible(false)}
                          >
                            <Text style={styles.badgeText}>
                              Tutup
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>

                  </SafeAreaView>
              );
            }

            const styles = StyleSheet.create({

            container:{
              flex:1,
              backgroundColor:"#F3F4F6",
            },

            center:{
              flex:1,
              justifyContent:"center",
              alignItems:"center",
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
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            },

            title: {
              fontSize: 22,
              fontWeight: "700",
              color: "#FFF",
            },

            dosen: {
              marginTop: 4,
              fontSize: 15,
              color: "#DBEAFE",
            },

            subtitle: {
              marginTop: 2,
              fontSize: 14,
              color: "#DBEAFE",
            },
            Topcard: {
              marginHorizontal: 20,
              marginTop: -50,
              marginBottom: 16,

              backgroundColor: "#FFF",
              borderRadius: 24,
              padding: 20,

              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 10,
              shadowOffset: {
                width: 0,
                height: 4,
              },
            },

            normalCard: {
              marginHorizontal: 20,
              marginBottom: 16,

              backgroundColor: "#FFF",
              borderRadius: 24,
              padding: 20,

              elevation: 3,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 8,
              shadowOffset: {
                width: 0,
                height: 2,
              },
            },

            pertemuan:{
              fontSize:20,
              fontWeight:"700",
              color:"#111827",
            },

            materi:{
              marginTop:8,
              fontSize:17,
              fontWeight:"600",
            },

            infoRow:{
              flexDirection:"row",
              alignItems:"center",
              marginTop:12,
            },

            info:{
              marginLeft:8,
              color:"#64748B",
            },

            section:{
              fontSize:18,
              fontWeight:"700",
              marginBottom:15,
            },

            statRow:{
              flexDirection:"row",
              justifyContent:"space-between",
              marginBottom:10,
            },

            studentRow:{
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:"center",
              paddingVertical:12,
              borderBottomWidth:1,
              borderBottomColor:"#F1F5F9",
            },

            studentName:{
              flex:1,
              fontSize:15,
              color:"#1E293B",
            },

            badge:{
              paddingHorizontal:12,
              paddingVertical:6,
              borderRadius:20,
            },

            badgeText:{
              color:"#FFF",
              fontWeight:"700",
              fontSize:12,
            },

            hadir:{
              backgroundColor:"#22C55E",
            },

            telat:{
              backgroundColor:"#F59E0B",
            },

            izin:{
              backgroundColor:"#3B82F6",
            },

            sakit:{
              backgroundColor:"#A855F7",
            },

            alfa:{
              backgroundColor:"#EF4444",
            },

            belum:{
              backgroundColor:"#94A3B8",
            },

            examCard:{
              margin:15,
              backgroundColor:"#FFF",
              borderRadius:15,
              padding:30,
              alignItems:"center",
            },

            examIcon:{
              fontSize:60,
            },

            examTitle:{
              marginTop:15,
              fontSize:26,
              fontWeight:"700",
            },

            examDesc:{
              marginTop:15,
              textAlign:"center",
              color:"#64748B",
              lineHeight:24,
            },
            studentList: {
              flex: 1,
              maxHeight: 320,
            },
            });