import { TextInput, StyleSheet } from "react-native";

type Props = {
  placeholder: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function AppInput({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholderTextColor="#999"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F4F7FE",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});