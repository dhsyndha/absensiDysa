import { StyleSheet, Text, View } from "react-native";

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
  item: Meeting;
  index: number;
  onPress?: () => void;
};

export default function RekapMeetingItem({
  item,
  index,
  onPress,
}: Props) {
  return (
    <View style={styles.row}>
      {}
      <Text style={[styles.cell, styles.no]}>
        {index + 1}
      </Text>

      {}
      <Text style={[styles.cell, styles.pertemuan]}>
        P{item.pertemuan}
      </Text>

      {}
      <Text style={[styles.cell, styles.tanggal]}>
        {item.tanggal}
      </Text>

      {}
      <Text
        style={[styles.cell, styles.materi]}
        numberOfLines={1}
      >
        {item.materi}
      </Text>

      {}
      <View style={styles.attendanceSpacer} />

      {}
      <Text style={styles.number}>
        {item.hadir}
      </Text>

      {}
      <Text style={styles.number}>
        {item.telat}
      </Text>

      {}
      <Text style={styles.number}>
        {item.izin}
      </Text>

      {}
      <Text style={styles.number}>
        {item.sakit}
      </Text>

      {}
      <Text style={styles.number}>
        {item.tidakHadir}
      </Text>

      {}
      <View style={styles.percent}>
        <Text style={styles.percentText}>
          {item.persentase}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },

  cell: {
    color: "#334155",
    fontSize: 13,
  },

  no: {
    width: 30,
    textAlign: "center",
  },

  pertemuan: {
    width: 75,
  },

  tanggal: {
    width: 90,
  },

  materi: {
    width: 220,
    fontWeight: "600",
  },

  attendanceSpacer: {
    width: 60,
  },

  number: {
    width: 45,
    textAlign: "center",
    color: "#0F172A",
    fontWeight: "600",
  },

  percent: {
    width: 50,
    alignItems: "center",
  },

  percentText: {
    color: "#16A34A",
    fontWeight: "700",
  },
});