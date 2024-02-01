import MarkaListesi from "./components/MarkaListesi";

const Urunler = [
    {
        name: "BMW",
        model: "2014",
        resimler: {
            resim1: "resim-1"
        }
    },
    {
        name: "Audi",
        model: "2014",
        resimler: {
            resim1: "resim-2"
        }
    },
    {
        name: "Reanult",
        model: "2014",
        resimler: {
            resim1: "resim-3"
        }
    },
    {
        name: "Volkswagen",
        model: "2014",
        resimler: {
            resim1: "resim-4"
        }
    }
]

export default function Markalar () {
    return (
        <div className="w-full h-full bg-slate-400">
            <h1 className="header">Markalar</h1>
            <div className="mt-5">
                <MarkaListesi arabalar = {Urunler}  />
            </div>
        </div>
    )
}