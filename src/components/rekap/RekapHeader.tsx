import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function RekapHeader() {
  return (
    <LinearGradient
      colors={["#4338CA", "#4F46E5", "#5B4CF6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >

      {}
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>
            Rekap Absensi
          </Text>

          <Text style={styles.subtitle}>
            Ringkasan kehadiran per matakuliah
          </Text>
        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingBottom: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  time: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },

  header: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },

  titleBox: {
    flex: 1,
    marginLeft: 18,
  },

  title: {
    color: "#fff",
    fontSize: 31,
    fontWeight: "700",
  },

  subtitle: {
    color: "#E5E7EB",
    marginTop: 4,
    marginBottom: 10,
    fontSize: 14,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -6,
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
});