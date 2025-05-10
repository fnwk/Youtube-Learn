import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function NotFound() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Page Not Found
      </Text>
      <Button title="Go Home" onPress={() => router.replace("/")} />
    </View>
  );
}
