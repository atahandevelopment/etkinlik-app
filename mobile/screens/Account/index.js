import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();

  const handleRoute = () => {
    navigation.navigate("Login");
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@token");
      return token != null ? setUserInfo(JSON.parse(token)) : null;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={tailwind("w-full h-full flex justify-start items-center")}>
      <View style={tailwind("w-full h-[280px] flex justify-end items-center")}>
        <MaterialCommunityIcons
          name="account-circle"
          size={220}
          color="#0e99c7"
        />
      </View>
      {!userInfo  ? (
        <View style={tailwind("w-full h-16 flex justify-center items-center")}>
          <Button
            mode="contained"
            buttonColor="#deba1d"
            textColor="#000000"
            onPress={handleRoute}
            style={tailwind(
              "w-7/12 mt-5 h-14 flex items-center justify-center"
            )}
          >
            <Text style={tailwind("text-lg")}>Giriş Yap</Text>
          </Button>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Account;
