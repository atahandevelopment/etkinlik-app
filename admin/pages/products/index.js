import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Button } from "@mui/material";
import { useState } from "react";
import NewProductForm from "./components/NewProduct";
import { BsPlus } from "react-icons/bs";
import { GetAllProductsService } from "@/services/products";
import ProductTable from "./components/ProductTable";
import MetaHead from "@/components/MetaHead";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "@/components/MobileSidebar";

export async function getServerSideProps() {
  let products = [];
  const response = await GetAllProductsService();
  products = response.data.data;

  return {
    props: {
      products,
    },
  };
}

export default function Products(props) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const siteHead= 'Ürün Yönetimi';
  const [products, setProducts] = useState(
    props.products ? props.products : []
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="products-container">
      <MetaHead title={siteHead}/>
      {mobileSidebarOpen ? (
        <div className="w-full flex justify-start items-start">
          <MobileSidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />
        </div>
      ) : (
        <></>
      )}
      <NewProductForm open={open} setOpen={setOpen} handleClose={handleClose} />
      <div className="w-11/12 h-10 lg:hidden flex justify-start items-center">
        <RxHamburgerMenu
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className={`text-black font-semibold size-5`}
        />
      </div>
      <div className="header">
        <h1>Ürün Yönetimi</h1>
      </div>
      <div className="button-groups">
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          className="hover:bg-blue-600 hover:text-white shadow-md"
          startIcon={<BsPlus />}
          onClick={handleOpen}
        >
          Ürün Ekle
        </Button>
      </div>
      {products.length > 0 ? (
        <div className="product-list">
          <ProductTable products={products} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

Products.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
