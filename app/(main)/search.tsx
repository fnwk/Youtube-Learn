import { Header } from "@/components/search";
import { FlatList, Text, View } from "react-native";

const Search = () => {
  console.log("Search");
  return (
    <FlatList
      data={[]}
      keyExtractor={(item) => item}
      style={{ overflow: "visible" }}
      contentContainerStyle={{
        paddingTop: 30,
      }}
      renderItem={() => <></>}
      ListHeaderComponent={() => <Header />}
    />
  );
};

export default Search;
