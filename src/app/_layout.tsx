import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { useFonts } from "expo-font";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ionicons: Ionicons.font,
    FontAwesome5: FontAwesome5.font,
    feather: Feather.font,
    MaterialCommunityIcons: MaterialCommunityIcons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

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