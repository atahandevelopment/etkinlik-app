import DefaultLayout from "@/layouts/default";
import ProductSlider from "@/components/home/ProductSlider";
import { IndexProps } from "@/types";
import { BannerService, GetAllProductsService } from "@/services/main-page";
import Banners from "@/components/home/BannerSlider";

// eslint-disable-next-line @next/next/no-typos
export async function getServerSideProps() {
  let products = [];
  let banners = [];
  const res = await GetAllProductsService({ in_mainpage: true });
  if (res.status === 200) {
    products = res.data.data;
  }

  const bannerResponse = await BannerService();
  if (bannerResponse.status === 200) {
    banners = bannerResponse.data.data;
  }

  return {
    props: {
      products,
      banners,
    },
  };
}
export default function IndexPage(props: IndexProps) {
  return (
    <DefaultLayout>
      <div className="lg:w-full md:w-screen h-[500px] rounded-md">
        <Banners banners={props?.banners} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ProductSlider products={props.products} />
      </div>
    </DefaultLayout>
  );
}
