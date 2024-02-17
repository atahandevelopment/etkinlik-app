import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FiTrash, FiEdit } from "react-icons/fi";
import { CiRead } from "react-icons/ci";
import Link from "next/link";
import { useContext } from "react";
import BannerManage from "../context/BannerManangeContext";
import { DeleteBanner } from "@/services/banners";
import { errorToastMessage, succesToastMessage } from "@/components/toastify";
import Swal from "sweetalert2";

export default function BannerTable() {
  const { banners, setSelectedTab, setBannerList, bannerList } =
    useContext(BannerManage);

  const handleDelete = async (id) => {
    try {
      const shouldDelete = await Swal.fire({
        title: "Silmek İstediğinize Emin misiniz?",
        text: "Seçtiğiniz banner silinecek.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3764fa",
        confirmButtonText: "Sil!",
      });
      if (shouldDelete.isConfirmed) {
        const response = await DeleteBanner(id);
        if (response.status === 200) {
          succesToastMessage('Banner silindi.', 1500, 'top-right');
          const filteredList = bannerList.filter(
            (f) => f._id !== response.data.data._id
          );
          setBannerList(filteredList);
        }
      }
    } catch (error) {
      errorToastMessage("Bir hata ile karşılaşıldı", 1500, "top-right");
    }
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 190 },
    {
      field: "image",
      headerName: "Resim",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="w-14 h-14 flex justify-center items-center">
            <img
              src={params.row.image.url}
              alt=""
              className="rounded-md object-cover shadow-md hover:cursor-pointer"
            />
          </div>
        );
      },
    },
    { field: "title", headerName: "Başlık", width: 190 },
    { field: "description", headerName: "Açıklama", width: 190 },
    {
      headerName: "İşlemler",
      description: "Silme ve Düzenleme işlemleri",
      width: 300,
      renderCell: (params) => {
        return (
          <div
            key={params.row._id}
            className="flex justify-center items-center gap-4"
          >
            <button onClick={() => handleDelete(params.row._id)}>
              <FiTrash className="size-5" />
            </button>
            <Link href={"/banner-detail/" + params.row._id}>
              <CiRead className="size-5" />
            </Link>
            <button onClick={() => setSelectedTab("edit")}>
              <FiEdit className="size-5" />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <DataGrid
      headerClassName="product-table-header"
      rows={banners}
      columns={columns}
      getRowId={(row) => row._id}
    />
  );
}
