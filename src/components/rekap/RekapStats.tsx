import { StyleSheet, Text, View } from "react-native";

type Props = {
  value: string;
  label: string;
  color: string;
};

export default function RekapStatBox({
  value,
  label,
  color,
}: Props) {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.value,
          {
            color,
          },
        ]}
      >
        {value}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 18,
    alignItems: "center",
  },

  value: {
    fontSize: 24,
    fontWeight: "700",
  },

  label: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
    fontWeight: "600",
  },
});