import { useUser } from "@/hooks/useUser";
import { logout } from "@/services/sessionService";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProfileScreen() {
  const user = useUser();

  async function handleLogout() {
    await signOut(auth);
    await logout();

    router.replace("/");
  }

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.nama}>{user.nama}</Text>

        <Text style={styles.info}>
          Role : {user.role}
        </Text>

        <Text style={styles.info}>
          Jabatan : {user.jabatan}
        </Text>

        <Text style={styles.info}>
          NIM / NIDN : {user.nomorIdentitas}
        </Text>

        <Text style={styles.info}>
          {user.email}
        </Text>

        <TouchableOpacity
          style={styles.logout}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    elevation: 4,
  },

  nama: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#475569",
  },

  logout: {
    marginTop: 30,
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 12,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});