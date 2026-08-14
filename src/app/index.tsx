import { useState } from "react";
import { router } from "expo-router";
import { simpanSession } from "@/services/sessionService";
import { login } from "@/services/authService";
import { seedDatabase } from "@/seed/seed";
import { useAuth } from "@/context/AuthContext";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Logo from "../components/Logo";

export default function LoginScreen() {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  
const handleLogin = async () => {
  try {
    const hasil = await login(nim, password);

    setUser(hasil.user);

    await simpanSession(hasil.user);

    router.replace("/dashboard");
  } catch (e: any) {
    alert(e.message);
  }
};

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.form}>
        <Text style={styles.label}>NIM</Text>

        <AppInput
          placeholder="Masukkan NIM"
          value={nim}
          onChangeText={setNim}
        />

        <Text style={styles.label}>Password</Text>

        <AppInput
          placeholder="Masukkan Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AppButton
          title="Masuk"
          onPress={handleLogin}
        />

        <TouchableOpacity
          onPress={() => router.push("/aktivasi")}
          style={styles.buttonBlue}
        >
          <Text style={styles.buttonText}>
            Aktivasi Akun
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await seedDatabase();
            alert("Import berhasil!");
          }}
          style={styles.buttonBlue}
        >
          <Text style={styles.buttonText}>
            Import Database
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  buttonBlue: {
    marginTop: 15,
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});