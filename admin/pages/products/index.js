import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Button } from "@mui/material";
import { useState } from "react";
import NewProductForm from "./components/NewProduct";
import { BsPlus } from "react-icons/bs";
import { GetAllProductsService } from "@/services/products";
import ProductTable from "./components/ProductTable";
import { useDispatch } from "react-redux";
import { getTitle } from "@/store/meta-title";

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
  const dispatch = useDispatch();
  dispatch(getTitle("Ürün Yönetimi"));
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(
    props.products ? props.products : []
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="products-container">
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
