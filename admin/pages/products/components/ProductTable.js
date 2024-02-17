import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FiTrash, FiEdit } from "react-icons/fi";
import { CiRead } from "react-icons/ci";
import Link from "next/link";

export default function ProductTable({ products }) {
  const columns = [
    { field: "_id", headerName: "ID", width: 190 },
    {field: "image", headerName: "Resim", width: 190, renderCell: (params) => {
      return (
        <div className="w-14 h-14 flex justify-center items-center">
          <img src={params.row.image.url} alt="" className="rounded-md object-cover shadow-md hover:cursor-pointer" />
        </div>
      )
    }},
    { field: "title", headerName: "Ürün Adı", width: 190 },
    {
      field: "brand.label",
      headerName: "Marka",
      width: 190,
      valueGetter: (params) => params.row.brand?.label || "",
    },
    {
      field: "category.label",
      headerName: "Kategori",
      width: 190,
      valueGetter: (params) => params.row.category?.label || "",
    },
    { field: "price", headerName: "Fiyat", width: 190 },
    { field: "stock", headerName: "Stok", width: 150 },
    {
      headerName: "İşlemler",
      description: "Silme ve Düzenleme işlemleri",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-4">
            <button>
              <FiTrash className="size-5" />
            </button>
            <Link href={"/product-detail/" + params.row._id}>
              <CiRead className="size-5" />
            </Link>
            <button>
              <FiEdit className="size-5" />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <DataGrid
      rows={products}
      columns={columns}
      getRowId={(row) => row._id}
    />
  );
}
