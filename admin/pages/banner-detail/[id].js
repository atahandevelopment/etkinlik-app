import { UpdateBannerInfo, getBannersService } from "@/services/banners";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import MetaHead from "@/components/MetaHead";
import { Button } from "@mui/material";
import EditBanner from "./components/EditBanner";
import { useEffect, useState } from "react";
import { errorToastMessage, succesToastMessage } from "@/components/toastify";

export async function getServerSideProps(context) {
  const bannerId = context.query.id;
  let bannerDetail = null;
  const response = await getBannersService(bannerId);
  if (response.status === 200) {
    bannerDetail = response?.data?.data[0];
  }
  return {
    props: {
      bannerDetail,
    },
  };
}

export default function BannerDetail(props) {
  const { bannerDetail } = props;
  const [bannerInfo, setBannerInfo] = useState(bannerDetail);
  const [isActiveBtn, setIsActiveBtn] = useState(bannerInfo?.is_active);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleIsActive = async (data) => {
    try {
      const response = await UpdateBannerInfo(bannerInfo?._id, data);
      if(response.status === 200) {
        const newData = response?.data?.data;
        setIsActiveBtn(newData?.is_active);
        succesToastMessage(`Banner ${newData?.is_active === true ? 'aktif edildi.' : 'pasife çekildi.'}`, 1500, 'top-right')
        setBannerInfo(newData);
      }
    } catch (error) {
      errorToastMessage("Bir hata oluştu", 1500, "top-right");
    }
  };

  return (
    <div className="product-container">
      <MetaHead title={bannerInfo?.title} />
      <EditBanner
        open={open}
        handleClose={handleClose}
        setBannerInfo={setBannerInfo}
        existingData={bannerInfo}
      />
      <div className="header">
        <h1>{bannerInfo?.title}</h1>
      </div>
      <div className="w-full h-screen flex items-center justify-around gap-2 max-lg:flex-wrap">
        <div className="w-1/2 h-[500px]">
          <img
            src={bannerDetail?.image?.url}
            className="rounded-md mx-2 object-contain"
          />
        </div>
        <div className="w-1/2 h-[500px] flex flex-col gap-4 justify-center items-center">
          <table className="w-3/4">
            <thead>
              <tr className="flex justify-center items-center">
                <th aria-colspan={2}>Ürün Bilgileri</th>
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
      </div>
    </div>
  );
}

BannerDetail.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
