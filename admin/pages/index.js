import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useDispatch } from "react-redux";
import { getTitle } from "@/store/meta-title";

// Sidebar Mobil görünüm ile çalışılıyordu. mesajlar sayfası hazırlandı. fiyat teklifleri sayfası hazırlanacak. devamında ürün detay sayfası
// onun da devamında tecrübeler sayfası hazırlanacak

export default function Home() {
  const dispatch = useDispatch();
  dispatch(getTitle("Kontrol Paneli"));
  return (
    <>
      <div className="w-full h-full m-1 p-1">Sayfa Alanı</div>
    </>
  );
}

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
