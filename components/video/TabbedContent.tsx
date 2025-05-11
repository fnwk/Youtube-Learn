import cn from "@/utils/cn";
import { Pressable, ScrollView, View } from "react-native";
import { StyledText } from "../ui";
import { useT } from "@/i18n/useTranslation";
import { useState } from "react";

interface TabProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

interface TabbedContentProps {
  description: string;
}

const Tab = ({ title, isActive, onPress }: TabProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "border-b-2 w-1/2",
        isActive ? "border-b-dark" : "border-b-gray",
      )}
    >
      <StyledText weight="semibold" className="w-full text-center py-2">
        {title}
      </StyledText>
    </Pressable>
  );
};

const TabbedContent = ({ description }: TabbedContentProps) => {
  const { t } = useT("video");

  const [activeTab, setActiveTab] = useState(0);

  return (
    <View className="flex-1">
      <View className="flex-row">
        <Tab
          title={t("description")}
          isActive={activeTab === 0}
          onPress={() => setActiveTab(0)}
        />
        <Tab
          title={t("notes")}
          isActive={activeTab === 1}
          onPress={() => setActiveTab(1)}
        />
      </View>
      <ScrollView className="flex-1">
        {activeTab === 0 ? (
          <StyledText className="p-4">{description}</StyledText>
        ) : (
          <StyledText className="p-4"></StyledText>
        )}
      </ScrollView>
    </View>
  );
};

export default TabbedContent;
