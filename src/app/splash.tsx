import { View, ActivityIndicator } from "react-native";
import { useAuthListener } from "@/hooks/useAuthListener";

export default function Splash() {
  useAuthListener();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
        color="#2563EB"
      />
    </View>
  );
}