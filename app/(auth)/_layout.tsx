import { Stack } from "expo-router";

const AuthLayout = () => {
  console.log("AuthLayout");
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;
