import React from "react";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const BackButton = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <FAB
        size="small"
        icon="keyboard-backspace"
        style={styles.fab}
        onPress={goBack}
      />
    </>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    marginLeft: 16,
    marginTop: 32,
    left: 0,
    top: 0,
    borderRadius: 99,
  },
});
