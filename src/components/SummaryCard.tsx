import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
  icon: any;
  title: string;
  value: string;
  color: string;
};

export default function SummaryCard({
  icon,
  title,
  value,
  color,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
        <FontAwesome5 name={icon} size={24} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 135,
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginRight: 15,

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  value: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  title: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 15,
  },
});