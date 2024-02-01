import { DataGrid } from "@mui/x-data-grid";
import { FiTrash } from "react-icons/fi";
import { Tooltip } from "@mui/material";

export default function MessageTable(props) {
  const { handleOpen, setExistingData, messages, handleDelete } = props;

  const columns = [
    {
      field: "fullname",
      headerName: "Müşteri İsmi",
      sortable: true,
      width: 300,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 300,
    },
    {
        field: "phone",
        headerName: "Telefon",
        width: 300,
      },
    {
      headerName: "İşlemler",
      description: "Mesaj aksiyon işlemleri",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-2">
            <Tooltip title="Sil">
              <button onClick={() => handleDelete(params.row._id)}>
                <FiTrash className="size-5 hover:text-red-600" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <DataGrid
        rows={messages}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row._id}
        getRowClassName={({row}) => !row?.is_read ? 'bg-blue-400' : ''}
        onRowClick={({row}) => {setExistingData(row); handleOpen()}}
      />
    </>
  );
}
