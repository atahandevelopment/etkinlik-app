import MetaHead from "@/components/MetaHead";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { getBannersService } from "@/services/banners";
import BannerTable from "./components/BannerTable";
import { useState } from "react";
import { Button } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import AddAndEditBanner from "./components/AddAndEditBanner";

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
  const siteHead = "Banner Yönetimi";
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="products-container">
      <AddAndEditBanner
        open={open}
        setOpen={setOpen}
        selectedTab={selectedTab}
        handleClose={handleClose}
      />
      <MetaHead title={siteHead} />
      <h1>Banner Yönetimi</h1>
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
          <BannerTable setSelectedTab={setSelectedTab} banners={bannerList} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

BannerYonetimi.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
