import React, { useState} from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

const SearhBar = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    navigation.navigate("Search", {
        screen: "Search",
        props: {
            query: searchQuery,
        }
    })
  }
  return (
    <View style={tailwind("w-full px-2 py-2 h-auto")}>
      <Searchbar
        placeholder="Etkinlik ara"
        onChangeText={setSearchQuery}
        onIconPress={() => handleSearch()}
      />
    </View>
  );
};

export default SearhBar;
