import { useState } from 'react';
import CustomPagination from './CustomPagination';

const UsingPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalRecords = 100; // Example: total number of records
  const recordsPerPage = 10; // Example: records per page

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Paginated Data</h1>
      {/* Custom Pagination Component */}
      <CustomPagination
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Example of displaying records for the current page */}
      <div>
        <h2>Showing records for Page {currentPage}</h2>
        {/* Render your paginated content here */}
        {Array.from({ length: recordsPerPage }, (_, index) => {
          const recordNumber = (currentPage - 1) * recordsPerPage + index + 1;
          return <div key={index}>Record {recordNumber}</div>;
        })}
      </div>
    </div>
  );
};

export default UsingPagination;
