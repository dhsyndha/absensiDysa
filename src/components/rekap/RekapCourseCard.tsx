import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import RekapMeetingList from "./RekapMeetingList";
import RekapStatBox from "./RekapStats";
import { router } from "expo-router";

type Course = {
  id: string;
  nama: string;
  dosen: string;
  hari: string;
  jam: string;
  ruangan: string;

  statistik: {
    persen: number;
    hadir: number;
    total: number;
    tidakHadir: number;
    pertemuan: number;
  };

  meetings: any[];
};

type Props = {
  item: Course;
};

export default function RekapCourseCard({
  item,
}: Props) {
  return (
    <View style={styles.card}>
      {}

      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="database"
              size={28}
              color="#5B4CF6"
            />
          </View>

          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>
                {item.nama}
              </Text>
            </View>

            <Text style={styles.dosen}>
              Dosen: {item.dosen}
            </Text>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Feather
                  name="clock"
                  size={14}
                  color="#64748B"
                />

                <Text style={styles.detailText}>
                  {item.hari}, {item.jam}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Feather
                  name="map-pin"
                  size={14}
                  color="#64748B"
                />

                <Text style={styles.detailText}>
                  {item.ruangan}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
            style={styles.arrowButton}
            activeOpacity={0.7}
            onPress={() =>
                router.push({
                pathname: "/rekap/detail/[id]",
                params: {
                    id: String(item.id),
                },
                })
            }
            >
        </TouchableOpacity>
      </View>

      {}

      <View style={styles.stats}>
        <RekapStatBox
          value={`${item.statistik.persen}%`}
          label="Rata-rata\nKehadiran"
          color="#22C55E"
        />

        <RekapStatBox
          value={`${item.statistik.hadir} / ${item.statistik.total}`}
          label="Rata-rata\nHadir"
          color="#F97316"
        />

        <RekapStatBox
          value={`${item.statistik.tidakHadir} / ${item.statistik.total}`}
          label="Rata-rata\nTidak Hadir"
          color="#EF4444"
        />

        <RekapStatBox
          value={`${item.statistik.pertemuan}`}
          label="Pertemuan"
          color="#2563EB"
        />
      </View>

      {}

      <RekapMeetingList
          meetings={item.meetings}
          onPressSeeAll={() =>
              router.push({
                  pathname: "/rekap/detail/[id]",
                  params: {
                      id: item.id,
                  },
              })
          }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 18,
    marginTop: 18,
    overflow: "hidden",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#F3F0FF",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
  },

  info: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    flexShrink: 1,
    color: "#0F172A",
  },

  badge: {
    backgroundColor: "#EEF7FF",
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "700",
  },

  dosen: {
    marginTop: 6,
    color: "#475569",
    fontSize: 13,
  },

  detailRow: {
    flexDirection: "column",
    marginTop: 8,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
    marginBottom: 4,
  },

  detailText: {
    marginLeft: 6,
    color: "#64748B",
    fontSize: 13,
  },

  arrowButton: {
    paddingLeft: 12,
  },

  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 18,
  },
});