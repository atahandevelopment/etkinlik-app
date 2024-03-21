import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigationComponent from "../../components/BottomNavigationComponent";
import EventDetails from "../EventDetails";
import Search from "../Search";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Categories from "../Categories";

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={BottomNavigationComponent}
        />
        <Stack.Screen
          name="EventDetails"
          options={{ headerShown: false }}
          component={EventDetails}
        />
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={Search}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Register}
        />
        <Stack.Screen
          name="Categories"
          options={{ headerShown: false }}
          component={Categories}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
