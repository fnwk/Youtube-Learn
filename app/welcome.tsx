import { Icon } from "@/assets/Icon";
import { AppButton, StyledText } from "@/components/ui";
import { useT } from "@/i18n/useTranslation";
import { Trans } from "react-i18next";
import { View } from "react-native";
import { openURL } from "expo-linking";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";

const WelcomeScreen = () => {
  const { t } = useT("welcome");
  const { setLoginStatus } = useAuthStore((state) => state);

  console.log("Login screen");

  const handleLogin = () => {
    setLoginStatus(true);
    router.replace("/(main)");
  };

  return (
    <View className="bg-gray w-screen h-screen px-[8%] pb-36 pt-24">
      <View className="items-center ">
        <Icon name="logo" />
      </View>

      <View className="flex-1 justify-center items-center">
        <Icon name="app" />
      </View>

      <View className="w-full items-center">
        <StyledText
          size="3xl"
          weight="semibold"
          color="white"
          className="mb-10 tracking-wider w-full"
        >
          {t("title")}
        </StyledText>
        <AppButton title={t("logInBtn")} onPress={handleLogin} />
        <StyledText size="md" color="white" className="text-center  mt-5">
          <Trans
            i18nKey="welcome:agreeText"
            components={[
              <StyledText
                size="md"
                color="dark"
                underline
                onPress={() => openURL("https://google.com")}
              />,
              <StyledText
                size="md"
                color="dark"
                underline
                onPress={() => openURL("youtube.com")}
              />,
            ]}
          />
        </StyledText>
      </View>
    </View>
  );
};

export default WelcomeScreen;
