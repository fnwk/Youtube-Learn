import { TextInput, View } from "react-native";
import { useEffect, useReducer, useRef, useState } from "react";
import { CustomTextInput, StyledText } from "../ui";
import { useT } from "@/i18n/useTranslation";
import { Trans } from "react-i18next";
import SortingModal from "./SortingModal";
import { SortingOption, SortingOptions } from "@/types/sorting";

interface SearchHeaderProps {
  inputFocused?: boolean;
  searchTerm: string;
  totalResults: number;
  sortingOption: SortingOption;
  setSearchTerm: (value: string) => void;
  setSortingOption: (value: SortingOption) => void;
}

const SearchHeader = ({
  inputFocused = false,
  searchTerm,
  totalResults,
  sortingOption,
  setSearchTerm,
  setSortingOption,
}: SearchHeaderProps) => {
  const { t } = useT("search");
  const inputRef = useRef<TextInput>(null);
  const sortingOptions = t("sortingOptions", {
    returnObjects: true,
  }) as SortingOptions;

  const [isSortingModalVisible, toggleIsSortingModalVisible] = useReducer(
    (state) => !state,
    false,
  );

  useEffect(() => {
    if (inputFocused) {
      inputRef.current?.focus();
    }
  }, [inputFocused]);

  return (
    <View className="items-center px-8 pb-2">
      <View className="flex-row w-full">
        <CustomTextInput
          ref={inputRef}
          iconName="search"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder={t("common:searchPlaceholder")}
        />
      </View>

      <StyledText size="sm" className="w-full mt-4">
        <Trans
          i18nKey="search:resultsLabel"
          values={{ searchTerm: searchTerm, numberOfResults: totalResults }}
          components={[<StyledText size="sm" weight="semibold" />]}
        />
      </StyledText>

      <StyledText
        className="w-full text-right mt-2"
        onPress={toggleIsSortingModalVisible}
      >
        <Trans
          i18nKey="search:sortBy"
          values={{
            sortBy: sortingOptions[sortingOption],
          }}
          components={[<StyledText weight="semibold" />]}
        />
      </StyledText>

      <SortingModal
        visible={isSortingModalVisible}
        onRequestClose={toggleIsSortingModalVisible}
        onConfirm={setSortingOption}
      />
    </View>
  );
};

export default SearchHeader;
