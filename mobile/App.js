import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import Home from './components/Home';
import { useState } from 'react';

export default function App() {
  const [isDark, setIsDark] = useState('light');

  return (
    <TailwindProvider utilities={utilities} colorScheme={isDark}>
      <Home isDark={isDark} setIsDark={setIsDark}/>
    </TailwindProvider>
  );
}

