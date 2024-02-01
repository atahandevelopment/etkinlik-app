import { LiaSitemapSolid } from "react-icons/lia";
import { BsCartCheck } from "react-icons/bs";
import { MdOutline6FtApart } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { FiSliders } from "react-icons/fi";
import { FaRegMessage } from "react-icons/fa6";

export const SidebarData = [
  {
    title: "Kontrol Paneli",
    link: "/",
    icon: () => <TfiDashboard className="size-6 font-semibold" />,
  },
  {
    title: "Gelen Mesajlar",
    link: "/mesajlar",
    icon: () =>  <FaRegMessage className="size-6 font-semibold" />,
  },
  {
    title: "Ürün Yönetimi",
    link: "/products",
    icon: () =>  <BsCartCheck className="size-6 font-semibold" />,
  },
  {
    title: "Kategori Yönetimi",
    link: "/categories",
    icon: () => <LiaSitemapSolid className="size-6 font-semibold" />,
  },
  {
    title: "Çözüm Ortakları",
    link: "/partners",
    icon: () => <MdOutline6FtApart className="size-6 font-semibold" />,
  },
  {
    title: "Banner Yönetimi",
    link: "/banner-yonetimi",
    icon: () => <TfiLayoutSliderAlt className="size-6 font-semibold" />
  },
  {
    title: "Site Ayarları",
    link: "/site-settings",
    icon: () =>  <FiSliders className="size-6 font-semibold" />
  },
];
