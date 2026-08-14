import { View, Text, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.icon}>📘</Text>
      </View>

      <Text style={styles.title}>Presensi</Text>

      <Text style={styles.subtitle}>
        Aplikasi Presensi Mahasiswa
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 40,
  },

  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  icon: {
    fontSize: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 5,
    fontSize: 15,
  },
});