import { TextInput, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { CustomTextInput, StyledText } from "../ui";
import { useT } from "@/i18n/useTranslation";
import { Trans } from "react-i18next";
import SortingModal from "./SortingModal";
import { SortingOption, SortingOptions } from "@/types/sorting";

/**
 * Search header component with input field, result count, and sorting option
 * @param inputFocused - If true, automatically focuses the search input
 * @param searchTerm - The current search term entered by the user
 * @param totalResults - The total number of results found based on the search
 * @param sortingOption - The current sorting option for the search results
 * @param setSearchTerm - Function to update the search term state
 * @param setSortingOption - Function to update the sorting option state
 */

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

  const [isSortingModalVisible, setIsSortingModalVisible] = useState(false);

  useEffect(() => {
    if (inputFocused) {
      inputRef.current?.focus();
    }
  }, [inputFocused]);

  return (
    <>
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
          pressableClassName="w-full"
          className="w-full text-right mt-2"
          onPress={() => setIsSortingModalVisible((state) => !state)}
        >
          <Trans
            i18nKey="search:sortBy"
            values={{
              sortBy: sortingOptions[sortingOption],
            }}
            components={[<StyledText weight="semibold" />]}
          />
        </StyledText>
      </View>
      <SortingModal
        visible={isSortingModalVisible}
        onRequestClose={() => setIsSortingModalVisible(false)}
        onConfirm={setSortingOption}
      />
    </>
  );
};

export default SearchHeader;
