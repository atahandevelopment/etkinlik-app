import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigationComponent from "./components/BottomNavigationComponent";
import EventDetails from "./screens/EventDetails";
import Search from "./screens/Search";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isDark, setIsDark] = useState("light");

  return (
    <TailwindProvider utilities={utilities} colorScheme={isDark}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown : false}} component={BottomNavigationComponent} />
          <Stack.Screen name="EventDetails" options={{ headerShown : false}} component={EventDetails} />
          <Stack.Screen name="Search" options={{ headerShown : false}} component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
