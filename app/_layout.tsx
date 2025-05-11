import "../global.css";
import "../i18n/i18n";

import "react-native-reanimated";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { usePoppinsFonts } from "@/utils/hooks/usePoppinsFonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = usePoppinsFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
