import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
};

export default function Header({ name }: Props) {
  const today = new Date();

  const tanggal = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>👋 Halo,</Text>

        <Text style={styles.name}>{name}</Text>

        <Text style={styles.date}>{tanggal}</Text>

        <View style={styles.status}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>Real-Time</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4F46E5",
    borderRadius: 28,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  left: {
    flex: 1,
  },

  greeting: {
    color: "#E0E7FF",
    fontSize: 16,
  },

  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 4,
  },

  date: {
    color: "#E0E7FF",
    marginTop: 6,
    fontSize: 14,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "rgba(255,255,255,.18)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 8,
  },

  statusText: {
    color: "#fff",
    fontWeight: "600",
  },

  right: {
    alignItems: "center",
  },

  notification: {
    marginBottom: 16,
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "#EF4444",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#fff",
  },
});