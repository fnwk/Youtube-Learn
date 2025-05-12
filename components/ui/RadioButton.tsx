import { Pressable, View } from "react-native";
import StyledText from "./StyledText";

interface RadioButtonProps {
  isSelected: boolean;
  onPress: () => void;
  label: string;
}

/**
 * Custom radio button component with selectable state and label
 * @param isSelected - Whether the radio button is currently selected
 * @param onPress - Callback triggered when the radio button is pressed
 * @param label - Text label displayed next to the radio button
 */

const RadioButton = ({ isSelected, onPress, label }: RadioButtonProps) => {
  return (
    <Pressable className="flex-row items-center mb-4" onPress={onPress}>
      <View className="w-6 h-6 rounded-full border-2 border-white items-center justify-center mr-3">
        {isSelected && <View className="w-3 h-3 rounded-full bg-dark" />}
      </View>
      <StyledText size="md" color="white">
        {label}
      </StyledText>
    </Pressable>
  );
};

export default RadioButton;
