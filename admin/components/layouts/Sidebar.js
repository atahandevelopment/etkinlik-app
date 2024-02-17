import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { succesToastMessage } from "../toastify";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { SidebarData } from "@/jsonData/sidebar";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [show, setShow] = useState(true);
  const { asPath } = useRouter();

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
        show ? "show-sidebar text-white" : "hidden-sidebar"
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
          <RxHamburgerMenu className={` ${!show ? 'text-black' : 'text-white'} font-semibold size-5`} />
        </button>
        <hr />
      </div>
      {show ? (
        <ul>
          {SidebarData.map((item, index) => {
            return (
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                key={index}
                className={`${
                  item?.link === asPath ? "bg-secondary text-white" : ""
                }`}
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
              </motion.li>
            );
          })}
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
          {SidebarData.map((item, i) => {
            return (
              <li
                key={i}
                className={`${
                  item?.link === asPath ? "bg-secondary text-white" : ""
                }`}
              >
                <Tooltip placement="right-start" arrow title={item?.title}>
                  <Link
                    href={item?.link}
                    className="flex gap-2 justify-start items-center w-full h-full"
                  >
                    <item.icon className="size-6 font-semibold" />
                  </Link>
                </Tooltip>
              </li>
            );
          })}
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
