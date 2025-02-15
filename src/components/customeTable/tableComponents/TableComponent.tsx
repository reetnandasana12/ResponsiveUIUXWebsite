import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import rows, { getData } from "../TableData";


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "code", headerName: "Code", width: 100 },
  { field: "population", headerName: "Population", width: 150 },
  { field: "area", headerName: "Area", width: 120 },
];

function TableComponent() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(rows.length / pageSize);

  const handleNext = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const paginatedData = getData({ page, pageSize });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={paginatedData} columns={columns}  />
      <div>
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span> Page {page} </span>
        <button onClick={handleNext} disabled={page >= totalPages}>
          Next
        </button>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}

export default TableComponent;
