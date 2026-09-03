import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { useFonts } from "expo-font";

import {
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function RootLayout() {
  useFonts({
    ...Ionicons.font,
    ...FontAwesome5.font,
    ...Feather.font,
    ...MaterialCommunityIcons.font,
  });

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="aktivasi" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="absensi/[id]" />
        <Stack.Screen name="absensi/detail/[mahasiswaId]" />
      </Stack>
    </AuthProvider>
  );
}