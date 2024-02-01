import React from "react";
import { useContext } from "react";
import ModelContext from "../contexts/ModelContext";
function ModelEkleme() {
  const { name, setName } = useContext(ModelContext);

  return (
    <div className="flex flex-col">
      <button className="p-2 border bg-blue-700 rounded-md" onClick={() => setName("Merve")}>İsmi Değiştir</button>
      <span className="text-red-700">{name}</span>
    </div>
  );
}

export default ModelEkleme;
