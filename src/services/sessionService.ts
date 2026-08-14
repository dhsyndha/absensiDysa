import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "USER_LOGIN";

export async function simpanSession(user: any) {
  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(user)
  );
}

export async function getSession() {
  const data = await AsyncStorage.getItem(KEY);

  if (!data) return null;

  return JSON.parse(data);
}

export async function logout() {
  await AsyncStorage.removeItem(KEY);
}