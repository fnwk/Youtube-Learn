import { CategorySection, Header } from "@/components/home";
import { AppButton } from "@/components/ui";
import { useAuthStore } from "@/stores/auth.store";
import { Redirect } from "expo-router";
import { View, FlatList } from "react-native";
import { useT } from "@/i18n/useTranslation";

export default function HomeScreen() {
  const setLoginStatus = useAuthStore((state) => state.setLoginStatus);
  const { t } = useT("home");
  const categories = t("categories", { returnObjects: true }) as string[];

  const handleLogin = () => {
    setLoginStatus(false);
    return <Redirect href="/" />;
  };

  return (
    <View className="flex-1 pt-5">
      <Header />
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        renderItem={({ item }) => <CategorySection title={item} />}
        ListHeaderComponent={() => <View className="h-8" />}
        ListFooterComponent={() => (
          <AppButton title="Log out" onPress={handleLogin} className="mt-10" />
        )}
      />
    </View>
  );
}
