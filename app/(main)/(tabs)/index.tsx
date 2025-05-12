import { CategorySection, Header } from "@/components/home";
import { View, FlatList } from "react-native";
import { useT } from "@/i18n/useTranslation";

export default function HomeScreen() {
  const { t } = useT("home");
  const categories = t("categories", { returnObjects: true }) as string[];

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
      />
    </View>
  );
}
