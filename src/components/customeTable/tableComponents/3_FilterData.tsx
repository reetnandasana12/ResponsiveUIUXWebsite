import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { columns, getData, getFilterData, maxLen } from '../TableData';
import { useState } from 'react';



export default function FilterData() {


    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [data, setData] = useState({
        name: '',
        code: '',
        population: '',
        size: '',
    });
    const [globalData,setGlobalData] = useState('');

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
    const paginatedData = getFilterData(data,globalData);
    console.log("Paginated Data:", paginatedData);

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ top: 0, minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
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
        </>
    );
}
