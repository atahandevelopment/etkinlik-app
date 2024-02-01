import { motion } from "framer-motion";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import Link from "next/link";
import { succesToastMessage } from "./toastify";
import { signOut } from "next-auth/react";
import { SidebarData } from "@/jsonData/sidebar";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/router";

export default function MobileSidebar({ setMobileSidebarOpen, mobileSidebarOpen }) {
  const { asPath } = useRouter();
  const findPath = SidebarData.filter(f => f.link === asPath);
  const initialPath = findPath[0]?.link;
  const initial = { width: 0};
  const animate = mobileSidebarOpen ? { width: '100%' } : { width: 0};
  const [selectedTab, setSelectedTab] = useState(initialPath ? initialPath : '');
  const logout = async () => {
    await succesToastMessage("Çıkış yapılıyor");
    await signOut();
  };
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6 }}
      className="shadow-md max-md:w-screen h-screen absolute bg-white"
      style={{ zIndex: 99, top: 0, left: 0 }}
    >
      <div className="w-11/12 h-10 flex justify-between mt-3 items-center">
        <Image
          src="/assets/images/dreamtelecom.png"
          alt="dreamtelecom"
          width={90}
          height={30}
        />
        <MdOutlineClose
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          size={24}
        />
      </div>
      <div className="w-11/12 flex flex-col justify-start items-center">
        <ul className="w-full flex flex-col justify-start items-start gap-3">
          {SidebarData.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => setSelectedTab(item?.link)}
                className={`w-full  p-3 ${selectedTab === item?.link ? 'bg-purple-800 text-white' : ''}`}
              >
                <Link
                  href={item.link}
                  className="flex gap-2 justify-start items-center w-full h-full"
                >
                  <label>
                    <item.icon />
                  </label>
                  <span className="font-semibold">{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li className="w-full hover:bg-purple-800 hover:text-white p-3">
            <button
              onClick={logout}
              className="flex gap-2 justify-start items-center font-semibold w-full h-full"
            >
              <FiLogOut className="size-6 font-semibold" />
              Çıkış
            </button>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
