import { AppButton } from "@/components/ui";
import { useAuthStore } from "@/stores/auth.store";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

export default function HomeScreen() {
  console.log("HomeScreen");
  const { setLoginStatus, isLoggedIn } = useAuthStore((state) => state);

  const handlelogin = () => {
    setLoginStatus(false);
    return <Redirect href="/" />;
  };

  return (
    <>
      <Text className="bg-dark text-white p-4">Home Screen</Text>
      <AppButton title="Log out" onPress={handlelogin} />
    </>
  );
}
