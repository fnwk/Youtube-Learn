import { TextInput, View } from "react-native";
import { CustomTextInput, IconButton } from "../ui";
import { useT } from "@/i18n/useTranslation";
import { router } from "expo-router";
import { useRef } from "react";

const HomeHeader = () => {
  const { t } = useT("common");
  const inputRef = useRef<TextInput>(null);

  const navigateToSearch = () => {
    router.push({ pathname: "/search", params: { focused: 1 } });
    inputRef.current?.blur();
  };

  const navigateToSettings = () => {
    router.push("/settings");
  };

  return (
    <View className="flex-row items-center px-8 mb-2">
      <CustomTextInput
        ref={inputRef}
        iconName="search"
        placeholder={t("searchPlaceholder")}
        onFocus={navigateToSearch}
      />
      <IconButton
        iconName="settings"
        size={32}
        className="ml-3"
        onPress={navigateToSettings}
      />
    </View>
  );
};

export default HomeHeader;
