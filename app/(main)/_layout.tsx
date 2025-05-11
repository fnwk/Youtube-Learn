import { Icon, IconType } from "@/assets/Icon";
import { useAuthStore } from "@/stores/auth.store";
import { tailwindColors } from "@/utils/colors";
import { Redirect, Tabs } from "expo-router";
import { Platform } from "react-native";

export default function MainLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tailwindColors.gray,
          height: 90,
          paddingTop: 10,
        },
        tabBarActiveTintColor: tailwindColors.white,
        tabBarInactiveTintColor: tailwindColors.dark,
        tabBarLabelStyle: {
          fontSize: 16,
          paddingTop: 5,
        },
        tabBarIcon: ({ color }) => {
          let iconName: IconType = "home";

          if (route.name === "index") {
            iconName = "home";
          } else if (route.name === "search") {
            iconName = "search";
          }

          return <Icon name={iconName} width={32} height={32} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
    </Tabs>
  );
}
