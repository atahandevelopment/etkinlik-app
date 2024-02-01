import { DeleteCategory, getAllCategories } from "@/services/categories";
import { Button } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import MetaHead from "@/components/MetaHead";
import AddAndEditCategory from "./components/AddAndEditCategory";
import CategoryTable from "./components/CategoryTable";
import Swal from "sweetalert2";
import { succesToastMessage } from "@/components/toastify";
import CategoryContext from "./contexts/CategoryContext";

export const getServerSideProps = async () => {
  let data = [];
  const response = await getAllCategories();
  if (response.status === 200) {
    data = response.data.data;
  }

  return {
    props: {
      categories: data,
    },
  };
};

export default function Categories(props) {
  const siteHead = "Kategori Yönetimi";
  const [categories, setCategories] = useState(
    props.categories ? props.categories : []
  );
  const [allCategories, setAllCategories] = useState(
    props.categories ? props.categories : []
  );
  const [existingData, setExistingData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const handleOpen = (tab) => {
    setSelectedTab(tab);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    const shouldDelete = await Swal.fire({
      title: "Silmek İstediğinize Emin misiniz?",
      text: "Seçtiğiniz kategori silinecek.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3764fa",
      confirmButtonText: "Sil!",
    });
    if (shouldDelete.isConfirmed) {
      if (id) {
        const response = await DeleteCategory(id);
        if (response.status === 200) {
          succesToastMessage("Kategori silindi", 1500, "top-right");
          const filteredCategories = categories.filter((f) => f._id !== id);
          setCategories(filteredCategories);
        }
      } else {
        errorToastMessage(
          "Bilinmeyen bir hata ile karşılaşıldı",
          1500,
          "top-right"
        );
      }
    }
  };
  const categoryProps = {
    handleClose,
    open,
    categories,
    setCategories,
    allCategories,
    selectedTab,
    existingData,
    setExistingData,
    handleDelete,
    handleOpen,
    handleClose,
  };

  return (
    <CategoryContext.Provider value={categoryProps}>
      <MetaHead title={siteHead} />
      <AddAndEditCategory />
      <div className="header">
        <h1>Kategori Yönetimi</h1>
      </div>
      <div className="button-field">
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          className="hover:bg-blue-600 hover:text-white shadow-md max-sm:hidden"
          startIcon={<BsPlus />}
          onClick={() => handleOpen("add")}
        >
          Kategori Ekle
        </Button>
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          className="hover:bg-blue-600 hover:text-white shadow-md sm:hidden"
          onClick={() => handleOpen("add")}
        >
          <BsPlus />
        </Button>
      </div>

      <div className="w-full h-full m-1 p-1">
        <CategoryTable />
      </div>
    </CategoryContext.Provider>
  );
}

Categories.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
