import { UpdateBannerInfo, getBannersService } from "@/services/banners";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import EditBanner from "./components/EditBanner";
import { useEffect, useState } from "react";
import { errorToastMessage, succesToastMessage } from "@/components/toastify";
import { useDispatch } from "react-redux";
import { getTitle } from "@/store/meta-title";
import BannerInfo from "./components/BannerInfo";
import BannerContext from "./context/BannerContext";

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
  const dispatch = useDispatch();
  dispatch(getTitle(bannerInfo?.title));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleIsActive = async (data) => {
    try {
      const response = await UpdateBannerInfo(bannerInfo?._id, data);
      if (response.status === 200) {
        const newData = response?.data?.data;
        setIsActiveBtn(newData?.is_active);
        succesToastMessage(
          `Banner ${
            newData?.is_active === true ? "aktif edildi." : "pasife çekildi."
          }`,
          1500,
          "top-right"
        );
        setBannerInfo(newData);
      }
    } catch (error) {
      errorToastMessage("Bir hata oluştu", 1500, "top-right");
    }
  };

  const bannerProps = {
    open,
    handleClose,
    setBannerInfo,
    bannerInfo,
    existingData: bannerInfo,
    toggleIsActive,
    isActiveBtn,
    setIsActiveBtn,
    handleOpen,
  };

  return (
    <BannerContext.Provider value={bannerProps} className="product-container">
      <EditBanner />
      <div className="w-full h-screen flex items-center justify-around gap-2 max-lg:flex-wrap">
        <div className="w-1/2 h-[500px]">
          <img
            src={bannerDetail?.image?.url}
            className="rounded-md mx-2 object-contain"
          />
        </div>

        <BannerInfo />
      </div>
    </BannerContext.Provider>
  );
}

BannerDetail.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
