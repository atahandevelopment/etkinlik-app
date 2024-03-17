// import { Image } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useTailwind } from "tailwind-rn";

const EventCard = ({data}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        tailwind(
          "w-1/2 h-auto border border-solid border-gray-300 rounded-md"
        )
      ]}
      onPress={() =>
        navigation.navigate("EventDetails", {
          screen: "EventDetails",
          props: {
            id: data?.id,
          },
        })
      }
    >
      <View style={styles.card_container}>
        <Image source={{ uri: data?.poster_url }} style={styles.image} />
        <Text style={tailwind("w-full px-1 h-auto dark:text-white")}>
          {data?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card_container: {
    width: "auto",
    height: 200,
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 25,
  },
  image_container: {
    width: "100%",
    height: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "55%",
    overflow: "hidden",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
