import { Feather } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import RekapMeetingItem from "./RekapMeetingItem";

type Meeting = {
  id: string;
  pertemuan: number;
  tanggal: string;
  materi: string;

  hadir: number;
  telat: number;
  izin: number;
  sakit: number;
  tidakHadir: number;

  persentase: number;
};

type Props = {
  meetings: Meeting[];
  onPressSeeAll?: () => void;
};

export default function RekapMeetingList({
  meetings,
  onPressSeeAll,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>5 Pertemuan Terakhir</Text>

        <TouchableOpacity
          onPress={onPressSeeAll}
          activeOpacity={0.7}
        >
          <View style={styles.seeAll}>
            <Text style={styles.seeAllText}>
              Lihat Semua
            </Text>

            <Feather
              name="arrow-right"
              size={16}
              color="#4F46E5"
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator
      >
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            {}
            <Text
              style={[
                styles.headerText,
                { width: 30 },
              ]}
            >
              No
            </Text>

            {}
            <Text
              style={[
                styles.headerText,
                { width: 75 },
              ]}
            >
              Pert.
            </Text>

            {}
            <Text
              style={[
                styles.headerText,
                { width: 90 },
              ]}
            >
              Tanggal
            </Text>

            {}
            <Text
              style={[
                styles.headerText,
                { width: 220 },
              ]}
            >
              Materi
            </Text>

            {}
            <View style={styles.attendanceSpacer} />

            {}
            <Text style={styles.small}>H</Text>
            <Text style={styles.small}>T</Text>
            <Text style={styles.small}>I</Text>
            <Text style={styles.small}>S</Text>
            <Text style={styles.small}>A</Text>

            {}
            <Text
              style={[
                styles.headerText,
                {
                  width: 50,
                  textAlign: "center",
                },
              ]}
            >
              %
            </Text>
          </View>

          {meetings
            .slice(0, 5)
            .map((meeting, index) => (
              <RekapMeetingItem
                key={meeting.id}
                item={meeting}
                index={index}
                onPress={onPressSeeAll}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  tableContainer: {
    width: 880,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  seeAll: {
    flexDirection: "row",
    alignItems: "center",
  },

  seeAllText: {
    marginRight: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 10,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
  },

  headerText: {
    fontWeight: "700",
    fontSize: 12,
    color: "#475569",
  },

  attendanceSpacer: {
    width: 60,
  },

  small: {
    width: 45,
    textAlign: "center",
    fontWeight: "700",
    color: "#475569",
  },

  materi: {
    width: 220,
    fontWeight: "600",
  },
});