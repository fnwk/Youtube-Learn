import { useRouter } from "expo-router";
import { View } from "react-native";
import IconButton from "../ui/IconButton";
import { tailwindColors } from "@/utils/colors";
import { StyledText } from "../ui";
import { useT } from "@/i18n/useTranslation";

const SettingsHeader = () => {
  const { t } = useT();
  const router = useRouter();
  return (
    <View className="flex-row items-center gap-4 mx-6 mt-6">
      <IconButton
        iconName="leftarrow"
        onPress={() => router.back()}
        color={tailwindColors.dark}
        size={32}
      />
      <StyledText size="xl" weight="semibold">
        {t("settings")}
      </StyledText>
    </View>
  );
};

export default SettingsHeader;
