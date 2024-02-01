import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaSitemapSolid } from "react-icons/lia";
import { BsCartCheck } from "react-icons/bs";
import { MdOutline6FtApart } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { FiLogOut, FiSliders } from "react-icons/fi";
import { succesToastMessage } from "../toastify";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@mui/material";

export default function Sidebar() {
  const [show, setShow] = useState(true);

  const animation = !show ? { width: "56px" } : { width: "300px" };

  const logout = async () => {
    await succesToastMessage("Çıkış yapılıyor");
    await signOut();
  };

  return (
    <motion.div
      initial={{ width: "300px" }}
      animate={animation}
      transition={{ duration: 0.5 }}
      className={`sidebar ${
        show ? "show-sidebar text-black" : "hidden-sidebar"
      }`}
    >
      <div
        className={`w-full flex burger-field ${
          show ? "justify-between" : "justify-start"
        } items-center`}
      >
        {show ? (
          <Image
            src="/assets/images/dreamtelecom.png"
            alt="dreamtelecom"
            width={90}
            height={30}
          />
        ) : (
          <></>
        )}

        <button
          className={`${
            show ? "w-1/3" : "w-full justify-center"
          } flex justify-end items-center`}
          onClick={() => setShow(!show)}
        >
          <RxHamburgerMenu className={`text-black font-semibold size-5`} />
        </button>
        <hr />
      </div>
      {show ? (
        <ul>
          <li className="hover:text-white">
            <Link
              href="/"
              className="flex gap-2 justify-start items-center w-full h-full"
            >
              <label>
                <TfiDashboard className="size-6 font-semibold" />
              </label>
              <span className="font-semibold">Kontrol Paneli</span>
            </Link>
          </li>
          <li className="hover:text-white">
            <Link
              href="/products"
              className="flex gap-2 justify-start items-center w-full h-full"
            >
              <label>
                <BsCartCheck className="size-6 font-semibold" />
              </label>
              <span className="font-semibold">Ürün Yönetimi</span>
            </Link>
          </li>
          <li className="hover:text-white">
            <Link
              href="/categories"
              className="flex gap-2 justify-start items-center w-full h-full"
            >
              <label>
                <LiaSitemapSolid className="size-6 font-semibold" />
              </label>
              <span className="font-semibold">Kategori Yönetimi</span>
            </Link>
          </li>
          <li className="hover:text-white">
            <Link
              href="/cozum-ortaklari"
              className="flex gap-2 justify-start items-center w-full h-full"
            >
              <label>
                <MdOutline6FtApart className="size-6 font-semibold" />
              </label>
              <span className="font-semibold">Çözüm Ortakları</span>
            </Link>
          </li>
          <li className="hover:text-white">
            <Link
              href="/banner-yonetimi"
              className="flex gap-2 justify-start items-center w-full h-full"
            >
              <label>
                <TfiLayoutSliderAlt className="size-6 font-semibold" />
              </label>
              <span className="font-semibold">Banner Yönetimi</span>
            </Link>
          </li>
          <li className="hover:text-white">
            <Link
              href="/site-settings"
              className="flex gap-2 justify-start items-center w-full h-full"
            >
              <label>
                <FiSliders className="size-6 font-semibold" />
              </label>
              <span className="font-semibold">Site Ayarları</span>
            </Link>
          </li>
          <li className="hover:text-white">
            <button
              onClick={logout}
              className="flex gap-2 justify-start items-center font-semibold w-full h-full"
            >
              <FiLogOut className="size-6 font-semibold" />
              Çıkış
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="hover:text-white">
            <Tooltip placement="right-start" arrow title="Kontrol Paneli">
              <Link
                href="/"
                className="flex gap-2 justify-start items-center w-full h-full"
              >
                <TfiDashboard className="size-6 font-semibold" />
              </Link>
            </Tooltip>
          </li>
          <li className="hover:text-white">
            <Tooltip placement="right-start" arrow title="Ürünler">
              <Link
                href="/products"
                className="flex gap-2 justify-start items-center w-full h-full"
              >
                <BsCartCheck className="size-6 font-semibold" />
              </Link>
            </Tooltip>
          </li>
          <li className="hover:text-white">
            <Tooltip placement="right-start" arrow title="Kategoriler">
              <Link
                href="/categories"
                className="flex gap-2 justify-start items-center w-full h-full"
              >
                <LiaSitemapSolid className="size-6 font-semibold" />
              </Link>
            </Tooltip>
          </li>
          <li className="hover:text-white">
            <Tooltip placement="right-start" arrow title="Çözüm Ortakları">
              <Link
                href="/cozum-ortaklari"
                className="flex gap-2 justify-start items-center w-full h-full"
              >
                <MdOutline6FtApart className="size-6 font-semibold" />
              </Link>
            </Tooltip>
          </li>
          <li className="hover:text-white">
            <Tooltip placement="right-start" arrow title="Banner Yönetimi">
              <Link
                href="/banner-yonetimi"
                className="flex gap-2 justify-start items-center w-full h-full"
              >
                <TfiLayoutSliderAlt className="size-6 font-semibold" />
              </Link>
            </Tooltip>
          </li>
          <li className="hover:text-white">
            <Tooltip placement="right-start" arrow title="Site Ayarları">
              <Link
                href="/site-settings"
                className="flex gap-2 justify-start items-center w-full h-full"
              >
                <FiSliders className="size-6 font-semibold" />
              </Link>
            </Tooltip>
          </li>
          <li className="hover:text-white">
            <Tooltip placement="right-start" arrow title="Çıkış">
              <button
                onClick={logout}
                className="flex gap-2 justify-start items-center font-semibold w-full h-full"
              >
                <FiLogOut className="size-6 font-semibold" />
              </button>
            </Tooltip>
          </li>
        </ul>
      )}
    </motion.div>
  );
}
