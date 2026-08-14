import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getMahasiswaByNim } from "@/services/mahasiswaService";
import Logo from "@/components/Logo";
import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";

export default function AktivasiScreen() {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const handleAktivasi = async () => {
  try {
    if (password !== konfirmasi) {
      alert("Konfirmasi password tidak sama");
      return;
    }

    const mahasiswa = await getMahasiswaByNim(nim);

    if (!mahasiswa) {
      alert("NIM tidak ditemukan");
      return;
    }

    const email = `${nim}@presensi.app`;

    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const userRef = doc(
      db,
      "users",
      credential.user.uid
    );

    await setDoc(userRef, {
      uid: credential.user.uid,
      nama: mahasiswa.nama,
      nomorIdentitas: mahasiswa.nim,
      role: "mahasiswa",
      jabatan: mahasiswa.jabatan ?? "anggota",
      email,
      aktif: true,
      refId: mahasiswa.id,
    });

alert("Aktivasi berhasil");

router.replace("/");

    alert("Aktivasi berhasil");

    router.replace("/");

  } catch (error: any) {
  console.log("AKTIVASI ERROR:", error);
  console.log("CODE:", error.code);
  console.log("MESSAGE:", error.message);

  alert(error.message);
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

        <Text style={styles.label}>Konfirmasi Password</Text>

        <AppInput
          placeholder="Konfirmasi Password"
          secureTextEntry
          value={konfirmasi}
          onChangeText={setKonfirmasi}
        />

        <AppButton
        title="Aktivasi Akun"
        onPress={handleAktivasi}
        />

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => router.back()}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#2563EB",
              fontWeight: "600",
            }}
          >
            Kembali ke Login
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
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
});