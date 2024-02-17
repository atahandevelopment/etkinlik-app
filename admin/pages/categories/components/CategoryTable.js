import { DataGrid } from "@mui/x-data-grid";
import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";
import { TbFolderSymlink } from "react-icons/tb";
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import CategoryContext from "../contexts/CategoryContext";

export default function CategoryTable() {
  const { handleOpen, setExistingData, categories, handleDelete} = useContext(CategoryContext);

  const columns = [
    { field: "_id", headerName: "ID", width: 400 },
    {
      field: "name",
      headerName: "Kategori Adı",
      description: "Kategori İsimleri",
      sortable: true,
      width: 300,
    },
    {
      field: "slug",
      headerName: "Kategori Slug",
      description: "Kategori slug'ı",
      sortable: true,
      width: 300,
    },
    {
      field: "parent.name",
      headerName: "Üst Kategori",
      description: "Hangi Kategorinin altında olduğunu gösterir",
      width: 300,
      valueGetter: (params) => params.row?.parent?.name || "",
    },
    {
      headerName: "İşlemler",
      description: "Silme ve Düzenleme işlemleri",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip placement="top" arrow title="Sil">
              <button onClick={() => handleDelete(params.row._id)}>
                <FiTrash className="size-5 hover:text-red-600" />
              </button>
            </Tooltip>
            <Tooltip placement="top" arrow title="Düzenle">
              <button
                onClick={() => {
                  setExistingData(params.row);
                  handleOpen("edit");
                }}
              >
                <FiEdit className="size-5 hover:text-purple-700" />
              </button>
            </Tooltip>
            <Tooltip placement="top" arrow title="Alt Kategoriler">
              <Link
                href={`/categories/children/${
                  params.row.slug + "_" + params.row._id
                }`}
              >
                <TbFolderSymlink className="size-5 hover:text-blue-700" />
              </Link>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const tableProps = {
    rows: categories,
    columns: columns,
    pageSize: 10,
    pageSizeOptions: [5, 10, 50, 100],
    checkboxSelection: true,
    getRowId: (row) => row?._id,
    initialState: {
      pagination: {
        paginationModel: { pageSize: 10, page: 0 }
      }
    }
  }
  return (
    <>
      <DataGrid
        {...tableProps}
      />
    </>
  );
}
