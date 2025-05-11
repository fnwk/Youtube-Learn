import React from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { Icon, IconType } from "@/assets/Icon";
import { tailwindColors } from "@/utils/colors";
interface CustomTextInputProps extends TextInputProps {
  iconName: IconType;
  placeholder: string;
}

const CustomTextInput = ({
  iconName,
  placeholder,
  ...props
}: CustomTextInputProps) => {
  return (
    <View className="flex-row items-center border-2 border-dark rounded-2xl px-4 py-2 flex-1">
      {/* Icon before input */}
      <Icon name={iconName} className="mr-2" color={tailwindColors.dark} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        className="flex-1 text-white text-xl pl-4"
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;
