import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FiTrash, FiEdit } from "react-icons/fi";
import { CiRead } from "react-icons/ci";
import Link from "next/link";

export default function BannerTable({ banners, setSelectedTab }) {
  const columns = [
    { field: "_id", headerName: "ID", width: 190 },
    {field: "image", headerName: "Resim", width: 190, renderCell: (params) => {
      return (
        <div className="w-14 h-14 flex justify-center items-center">
          <img src={params.row.image.url} alt="" className="rounded-md object-cover shadow-md hover:cursor-pointer" />
        </div>
      )
    }},
    { field: "title", headerName: "Başlık", width: 190 },
    { field: "description", headerName: "Açıklama", width: 190 },
    {
      headerName: "İşlemler",
      description: "Silme ve Düzenleme işlemleri",
      width: 300,
      renderCell: (params) => {
        return (
          <div key={params.row._id} className="flex justify-center items-center gap-4">
            <button>
              <FiTrash className="size-5" />
            </button>
            <Link href={"/banner-detail/" + params.row._id}>
              <CiRead />
            </Link>
            <button onClick={() => setSelectedTab('edit')}>
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
