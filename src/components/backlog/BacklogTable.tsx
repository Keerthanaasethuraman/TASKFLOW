import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import { useAppSelector } from "../../redux/hooks";

export default function BacklogTable() {

  const rows = useAppSelector(
    (state) => state.tasks.tasks
  );

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 2,
    },

    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },

    {
      field: "assignedTo",
      headerName: "Assigned To",
      flex: 1.5,

      valueGetter: (_value, row) =>
        typeof row.assignedTo === "string"
          ? "Unassigned"
          : row.assignedTo?.name || "Unassigned",
    },

    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1.5,

      valueGetter: (_value, row) =>
        row.dueDate
          ? new Date(row.dueDate).toLocaleDateString()
          : "-",
    },
  ];

  return (
    <div
      style={{
        height: 650,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
    </div>
  );
}