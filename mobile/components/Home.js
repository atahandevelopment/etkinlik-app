import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useTailwind } from "tailwind-rn";
import { MenuList } from "../MainMenu/List";
import { Icon } from "@rneui/themed";
import { getEvents } from "../services";

const Home = ({ isDark, setIsDark }) => {
  const tailwind = useTailwind();
  const handleTheme = () => {
    setIsDark(isDark === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    getEvents().then((response) => {
      console.log("data",response.data);
    }).catch((error) => { console.error("erorr",error); });
  },[])
  return (
    <View
      style={tailwind(
        "w-full h-full flex items-center justify-between bg-white dark:bg-blue-900"
      )}
    >
      <View
        style={tailwind(
          "w-full h-auto mt-10 flex justify-center items-end mr-2"
        )}
      >
          <Icon
            onPress={() => handleTheme()}
            name={isDark === "dark" ? "moon" : "sun"}
            type="feather"
            color={isDark === "light" ? "black" : "white"}
            size={25}
          />
      </View>
      <View style={tailwind("w-full h-auto pt-6 px-2")}>
        {MenuList.map((item, index) => {
          return (
            <View
              key={index}
              style={tailwind("w-full h-auto flex items-start mb-2 flex-wrap")}
            >
              <View
                style={tailwind(
                  "w-1/2 h-[100px] justify-center items-center mr-2 rounded-lg border-2 border-slate-300 dark:border-yellow-200"
                )}
              >
                <Text
                  style={tailwind(
                    "text-black dark:text-white font-bold text-xl"
                  )}
                >
                  {item.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View
        style={tailwind(
          "w-full h-[40px] flex bg-blue-900 dark:bg-white justify-center"
        )}
      >
        <Text style={tailwind("text-white dark:text-black text-xl")}>Menü</Text>
      </View>
    </View>
  );
};

export default Home;
