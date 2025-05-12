import { AppButton, StyledText } from "@/components/ui";
import { View } from "react-native";
import { Header } from "@/components/settings";
import { Icon } from "@/assets/Icon";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";

export default function SettingsScreen() {
  const setLoginStatus = useAuthStore((state) => state.setLoginStatus);

  const handleLogin = () => {
    setLoginStatus(false);
    router.replace("/");
  };

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-row mt-4 w-full justify-center items-center py-10 border-b-2 border-b-dark">
        <View className="bg-dark w-12 h-12 rounded-full items-center justify-center">
          <Icon name="person" width={16} height={16} />
        </View>
        <StyledText size="lg" weight="bold" className="ml-3">
          John Doe
        </StyledText>
      </View>
      <View className="p-6">
        <AppButton title="Log out" onPress={handleLogin} className="mt-10" />
      </View>
    </View>
  );
}
