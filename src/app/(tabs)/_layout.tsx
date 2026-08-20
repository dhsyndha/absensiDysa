import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "@/hooks/useUser";

export default function TabLayout() {
  const user = useUser();

  const isDemo =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("demo") === "true";

if (!user && !isDemo) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 12,
        },
      }}
    >
      {/* Dashboard */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} color={color} />
          ),
        }}
      />

      {/* Khusus Admin */}
      {(user?.role === "admin" || isDemo) && (
        <Tabs.Screen
          name="mahasiswa"
          options={{
            title: "Mahasiswa",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="users" size={20} color={color} />
            ),
          }}
        />
      )}

      {/* Semua Role */}
      <Tabs.Screen
        name="matakuliah"
        options={{
          title: "Matkul",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="rekap"
        options={{
          title: "Rekap",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="chart-bar"
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}