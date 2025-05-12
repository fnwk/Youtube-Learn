import { Icon } from "@/assets/Icon";
import { AppButton, StyledText } from "@/components/ui";
import { useT } from "@/i18n/useTranslation";
import { Trans } from "react-i18next";
import { Dimensions, View } from "react-native";
import { openURL } from "expo-linking";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";

const WelcomeScreen = () => {
  const { t } = useT("welcome");
  const { setLoginStatus } = useAuthStore((state) => state);

  const handleLogin = () => {
    setLoginStatus(true);
    router.replace("/(main)/(tabs)");
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

        <View className="flex-grow-0 flex-row items-start flex-wrap justify-center mt-6  w-full">
          <Trans
            i18nKey="welcome:agreeText"
            components={[
              <StyledText
                size="md"
                color="dark"
                underline
                pressableClassName="p-0"
                onPress={() => openURL("https://google.com")}
              />,
              <StyledText
                size="md"
                color="dark"
                underline
                onPress={() => openURL("https://youtube.com")}
                pressableClassName="p-0 "
              />,
              <StyledText
                size="md"
                color="white"
                className="w-full text-center"
              />,
              <StyledText size="md" color="white" />,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
