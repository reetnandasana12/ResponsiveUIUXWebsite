import { useState } from "react";
import { getData, maxLen } from "../TableData";

function PaginationComponent() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const maxSize = maxLen();

  const totalPages = Math.ceil(maxSize / pageSize);


  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset to first page on page size change
  };

  // const paginatedData = getData({ page, pageSize });
  const paginatedData = 
  
  console.log("Paginated Data:", paginatedData);

  return (
    <div>
      <input type="text"/>
      <button onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>
      <span> Page {page} </span>
      <button onClick={handleNext} disabled={page >= totalPages}>Next</button>
      <select value={pageSize} onChange={handlePageSizeChange}>
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}

export default PaginationComponent;
