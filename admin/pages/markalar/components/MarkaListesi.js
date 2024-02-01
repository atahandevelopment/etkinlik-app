import { useState } from "react";

export default function MarkaListesi({ arabalar }) {
  const [number, setNumber] = useState(0);
  const [boolean, setBoolean] = useState(false);

  console.log(boolean);
  return (
    <div className="w-2/12 flex justify-center h-30 bg-blue-800">
      <h1 className="header">Bu bir component</h1>

      <button
        onClick={() => {
          setBoolean(!boolean);
          setNumber(number + 1);
        }}
      >
        Arttır
      </button>
      <ul>
        {
            arabalar.map((araba,index) => {
                return (
                    <li className="h-10 text-2xl" key={index}>{araba.resimler.resim1}</li>
                )
            })
        }
      </ul>

    </div>
  );
}
