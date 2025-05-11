import { CategorySection, Header } from "@/components/home";
import { AppButton } from "@/components/ui";
import { useAuthStore } from "@/stores/auth.store";
import { Redirect } from "expo-router";
import { FlatList } from "react-native";
import { useT } from "@/i18n/useTranslation";

export default function HomeScreen() {
  const setLoginStatus = useAuthStore((state) => state.setLoginStatus);
  const { t } = useT("home");
  const categories = t("categories", { returnObjects: true }) as string[];

  const handleLogin = () => {
    setLoginStatus(false);
    return <Redirect href="/" />;
  };

  const mockVideos = [
    {
      id: "1",
      thumbnail: require("@/assets/images/app-icon.png"),
      channelName: "Channel Name",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      uploadDate: "1 day ago",
    },
    {
      id: "2",
      thumbnail: require("@/assets/images/logo.png"),
      channelName: "Channel Name",
      title: "Video Title 2",
      uploadDate: "2 days ago",
    },
  ];

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item}
      style={{ overflow: "visible" }}
      contentContainerStyle={{
        paddingTop: 30,
      }}
      renderItem={({ item }) => <CategorySection title={item} />}
      ListHeaderComponent={() => <Header />}
      ListFooterComponent={() => (
        <AppButton title="Log out" onPress={handleLogin} className="mt-10" />
      )}
    />
  );
}
