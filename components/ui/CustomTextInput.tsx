import { forwardRef } from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { Icon, IconType } from "@/assets/Icon";
import { tailwindColors } from "@/utils/colors";

interface CustomTextInputProps extends TextInputProps {
  iconName: IconType;
  placeholder: string;
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  ({ iconName, placeholder, ...props }, ref) => {
    return (
      <View className="flex-row items-center border-2 border-dark rounded-2xl px-4 flex-1">
        <Icon name={iconName} className="mr-2" color={tailwindColors.dark} />
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor="#999"
          className="flex-1 text-dark text-xl pl-4 h-full  py-4"
          {...props}
        />
      </View>
    );
  },
);

export default CustomTextInput;
