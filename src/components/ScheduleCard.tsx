import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
  subject: string;
  room: string;
  time: string;
  status: string;
};

export default function ScheduleCard({
  subject,
  room,
  time,
  status,
}: Props) {
  const getStatusColor = () => {
    switch (status) {
      case "Sedang Berlangsung":
        return "#22C55E";
      case "Belum Dimulai":
        return "#F59E0B";
      case "Selesai":
        return "#2563EB";
      default:
        return "#64748B";
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.iconBox}>
          <FontAwesome5
            name="book-open"
            size={22}
            color="#2563EB"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.subject}>{subject}</Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: getStatusColor(),
              },
            ]}
          >
            <Text style={styles.badgeText}>
              {status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5
          name="clock"
          size={15}
          color="#64748B"
        />

        <Text style={styles.info}>
          {time}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5
          name="map-marker-alt"
          size={15}
          color="#64748B"
        />

        <Text style={styles.info}>
          {room}
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <FontAwesome5
          name="clipboard-check"
          color="#fff"
          size={16}
        />

        <Text style={styles.buttonText}>
          Buka Absensi
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,

    shadowColor: "#2563EB",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
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

  content: {
    flex: 1,
  },

  subject: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  info: {
    marginLeft: 12,
    color: "#64748B",
    fontSize: 15,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 10,
  },
});