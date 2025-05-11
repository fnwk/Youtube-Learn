import { View } from "react-native";
import { CustomTextInput } from "../ui";
import { useT } from "@/i18n/useTranslation";

const SearchHeader = () => {
  const { t } = useT("common");

  return (
    <View className="flex-row items-center px-8 mb-10">
      <CustomTextInput iconName="search" placeholder={t("searchPlaceholder")} />
    </View>
  );
};

export default SearchHeader;
