import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { useState } from "react";
import Navigator from "./screens/Navigator";

export default function App() {
  const [isDark, setIsDark] = useState("light");

  return (
    <TailwindProvider utilities={utilities} colorScheme={isDark}>
     <Navigator/>
    </TailwindProvider>
  );
}
