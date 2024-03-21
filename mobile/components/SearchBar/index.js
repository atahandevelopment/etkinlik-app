import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, FAB, Searchbar } from "react-native-paper";

const SearhBar = ({ onSearch, setOnSearch }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => {
    setOnSearch(false);
  };

  const handleSearch = async () => {
    navigation.navigate("Search", {
      screen: "Search",
      props: {
        query: searchQuery,
      },
    });
  };
  return (
    <Modal
      visible={onSearch}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modal}>
        <View style={tailwind("w-full h-[70px] flex justify-end items-end")}>
          <Button onPress={handleClose}>
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </Button>
        </View>
        <View style={tailwind("w-full h-full flex justify-start items-center")}>
          <Searchbar
            onIconPress={() => handleSearch()}
            style={tailwind("w-10/12")}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SearhBar;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 99,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
