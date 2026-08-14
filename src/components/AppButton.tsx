import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export default function AppButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});