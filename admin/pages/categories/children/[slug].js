import DefaultLayout from "@/components/layouts/DefaultLayout";
import { getAllCategories } from "@/services/categories";
import CategoryTable from "../components/CategoryTable";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddAndEditCategory from "../components/AddAndEditCategory";
import { BsPlus } from "react-icons/bs";
import Swal from "sweetalert2";
import CategoryContext from "../contexts/CategoryContext";
import { useDispatch } from "react-redux";
import { getTitle } from "@/store/meta-title";

export async function getServerSideProps(context) {
  let id = null;
  let slug_id = context.query.slug;
  id = slug_id.split("_").pop();
  let catData = [];
  let allCategories = [];

  const allCategoriesRes = await getAllCategories();

  if (allCategoriesRes.status === 200) {
    allCategories = allCategoriesRes?.data?.data;
  }

  const response = await getAllCategories(id);
  if (response.status === 200) {
    catData = response.data.data;
  }

  return {
    props: {
      slug_id,
      id,
      catData,
      allCategories,
    },
  };
}

export default function ChildrenCategories(props) {
  const { catData } = props;
  const dispatch = useDispatch();
  dispatch(getTitle("Kategori Yönetimi"));
  const [categories, setCategories] = useState(
    catData && catData?.length > 0 ? catData : []
  );
  const [allCategories, setAllCategories] = useState(props?.allCategories);
  const [existingData, setExistingData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const handleOpen = (tab) => {
    setSelectedTab(tab);
    setOpen(true);
  };

  useEffect(() => {
    setCategories(catData && catData.length > 0 ? catData : []);
  }, [catData]);

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
    selectedTab,
    existingData,
    setExistingData,
    handleDelete,
    handleOpen,
    handleClose,
    allCategories,
  };

  return (
    <CategoryContext.Provider value={categoryProps}>
      <AddAndEditCategory />
      <div className="button-field">
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          className="hover:bg-blue-600 hover:text-white shadow-md"
          startIcon={<BsPlus />}
          onClick={() => handleOpen("add")}
        >
          Kategori Ekle
        </Button>
      </div>

      <div className="w-full h-full m-1 p-1">
        <CategoryTable />
      </div>
    </CategoryContext.Provider>
  );
}

ChildrenCategories.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
