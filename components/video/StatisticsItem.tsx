import { Icon, IconType } from "@/assets/Icon";
import cn from "@/utils/cn";
import { View } from "react-native";
import { StyledText } from "../ui";

interface StatisticsItemProps {
  iconName: IconType;
  value: string;
  className?: string;
}

const StatisticsItem = ({
  iconName,
  value,
  className = "",
}: StatisticsItemProps) => {
  return (
    <View
      className={cn(
        "flex-row items-center bg-dark rounded-lg py-2 px-4",
        className,
      )}
    >
      <Icon name={iconName} />
      <StyledText size="sm" weight="semibold" className="mx-4 text-white">
        {value}
      </StyledText>
    </View>
  );
};

export default StatisticsItem;
