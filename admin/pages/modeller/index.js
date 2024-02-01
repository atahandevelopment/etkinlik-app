import React, { useState } from "react";
import ModelContext from "./contexts/ModelContext";
import ModelEkleme from "./components/ModelEkleme";

function ModelPage() {
  const [name, setName] = useState("Hasan");
  const proplar = { name, setName };
  return (
    <ModelContext.Provider value={proplar}>
      <ModelEkleme />
    </ModelContext.Provider>
  );
}

export default ModelPage;
