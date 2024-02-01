import DefaultLayout from "@/components/layouts/DefaultLayout";
import MetaHead from "@/components/MetaHead";
import MobileSidebar from "@/components/MobileSidebar";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

// Sidebar Mobil görünüm ile çalışılıyordu. mesajlar sayfası hazırlandı. fiyat teklifleri sayfası hazırlanacak. devamında ürün detay sayfası
// onun da devamında tecrübeler sayfası hazırlanacak

export default function Home() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const metaTitle = "Kontrol Paneli";
  return (
    <>
      {mobileSidebarOpen ? (
        <div className="w-full flex justify-start items-start">
          <MobileSidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
        </div>
      ) : (
        <></>
      )}
      <MetaHead title={metaTitle} />
      <div className="w-11/12 h-10 lg:hidden flex justify-start items-center">
        <RxHamburgerMenu
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className={`text-black font-semibold size-5`}
        />
      </div>
      <div className="header">
        <h1>Dashboard</h1>
      </div>
      <div className="w-full h-full m-1 p-1">
        Sayfa Alanı
      </div>
    </>
  );
}

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
