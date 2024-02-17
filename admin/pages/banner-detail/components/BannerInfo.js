import React, { useContext } from "react";
import { Button } from "@mui/material";
import BannerContext from "../context/BannerContext";

const BannerInfo = () => {
  const {handleOpen, bannerInfo, toggleIsActive, isActiveBtn} = useContext(BannerContext);
  return (
    <div className="w-1/2 h-[500px] flex flex-col gap-4 justify-center items-center">
      <table className="w-3/4">
        <thead>
          <tr className="flex justify-center items-center">
            <th aria-colspan={2}>Banner Bilgileri</th>
          </tr>
        </thead>
        <tbody className=" flex flex-col gap-2">
          <tr>
            <td className="font-bold">Başlık: </td>
            <td>{bannerInfo?.title}</td>
          </tr>
          <tr>
            <td className="font-bold">Açıklama: </td>
            <td>{bannerInfo?.description}</td>
          </tr>
          <tr>
            <td className="font-bold">Durum: </td>
            <td>
              <button
                className={`bg-white border-${
                  bannerInfo?.is_active === true ? "green" : "red"
                }-600 border-[1px] text-${
                  bannerInfo?.is_active === true ? "green" : "red"
                }-600 p-2 rounded-md`}
                onClick={() => toggleIsActive({ is_active: !isActiveBtn })}
              >
                {bannerInfo?.is_active === false ? "Pasif" : "Aktif"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{ textTransform: "none" }}
        className="hover:bg-blue-600 hover:text-white shadow-md"
      >
        Düzenle
      </Button>
    </div>
  );
};

export default BannerInfo;
