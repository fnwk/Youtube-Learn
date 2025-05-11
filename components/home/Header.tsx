import { View } from "react-native";
import { CustomTextInput, IconButton } from "../ui";
import { useT } from "@/i18n/useTranslation";

const HomeHeader = () => {
  const { t } = useT("common");

  return (
    <View className="flex-row items-center px-8 mb-10">
      <CustomTextInput iconName="search" placeholder={t("searchPlaceholder")} />
      <IconButton iconName="settings" size={32} className="ml-3" />
    </View>
  );
};

export default HomeHeader;
