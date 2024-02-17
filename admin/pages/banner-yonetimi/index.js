import DefaultLayout from "@/components/layouts/DefaultLayout";
import { getBannersService } from "@/services/banners";
import BannerTable from "./components/BannerTable";
import { useState } from "react";
import { Button } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import AddAndEditBanner from "./components/AddAndEditBanner";
import { useDispatch } from "react-redux";
import { getTitle } from "@/store/meta-title";
import BannerManage from "./context/BannerManangeContext";

export async function getServerSideProps() {
  let banners = [];

  const res = await getBannersService();

  if (res.status === 200) {
    banners = res.data.data;
  }
  return {
    props: {
      banners,
    },
  };
}

export default function BannerYonetimi(props) {
  const [bannerList, setBannerList] = useState(props.banners || []);
  const [selectedTab, setSelectedTab] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  dispatch(getTitle("Banner Yönetimi"));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const bannerManageProps = {
    bannerList,
    setBannerList,
    open,
    setOpen,
    selectedTab,
    handleClose,
    setSelectedTab,
    handleOpen,
    banners: bannerList,
  };

  return (
    <BannerManage.Provider
      value={bannerManageProps}
      className="products-container"
    >
      <AddAndEditBanner />
      <div className="button-groups">
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          className="hover:bg-blue-600 hover:text-white shadow-md"
          startIcon={<BsPlus />}
          onClick={() => {
            setSelectedTab("add");
            handleOpen();
          }}
        >
          Banner Ekle
        </Button>
      </div>
      {bannerList.length > 0 ? (
        <div className="product-list">
          <BannerTable />
        </div>
      ) : (
        <></>
      )}
    </BannerManage.Provider>
  );
}

BannerYonetimi.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
