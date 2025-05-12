import { FlatList, Modal, Pressable, View } from "react-native";
import { AppButton, StyledText } from "../ui";
import { useT } from "@/i18n/useTranslation";
import RadioButton from "../ui/RadioButton";
import { useState } from "react";
import { SortingOption, SortingOptions } from "@/types/sorting";

interface SortingModalProps {
  visible: boolean;
  onRequestClose: () => void;
  onConfirm: (option: SortingOption) => void;
}

const SortingModal = ({
  visible,
  onRequestClose,
  onConfirm,
}: SortingModalProps) => {
  const { t } = useT("search");
  const sortingOptions = t("sortingOptions", {
    returnObjects: true,
  }) as SortingOptions;
  const [selectedOption, setSelectedOption] =
    useState<SortingOption>("viewCount");

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        className="flex-1 bg-[#202121e0] px-4"
        onTouchEnd={onRequestClose}
      />
      <View className="absolute  bg-gray rounded-3xl px-6 py-12 w-[82%] h-1/2 self-center top-1/4">
        <StyledText
          size="2xl"
          weight="semibold"
          color="white"
          className="mb-10"
        >
          {t("sortRecordsBy")}
        </StyledText>
        <FlatList
          data={Object.values(sortingOptions)}
          renderItem={({ item }) => (
            <RadioButton
              label={item}
              isSelected={
                selectedOption ===
                (Object.keys(sortingOptions).find(
                  (key) => item === sortingOptions[key as SortingOption],
                ) as SortingOption)
              }
              onPress={() =>
                setSelectedOption(
                  () =>
                    (Object.keys(sortingOptions).find(
                      (key) => item === sortingOptions[key as SortingOption],
                    ) as SortingOption) ?? "viewCount",
                )
              }
            />
          )}
        />
        <AppButton
          title={t("common:confirm")}
          onPress={() => {
            onConfirm(selectedOption);
            onRequestClose();
          }}
          className="mt-auto"
        />
      </View>
    </Modal>
  );
};

export default SortingModal;
