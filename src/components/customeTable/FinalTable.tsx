import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Tooltip, IconButton, Box, FormControlLabel, Menu, Radio, RadioGroup, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import rows, { columns } from './TableData';

export default function CustomTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [filters, setFilters] = React.useState<Record<string, string>>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'ASC' | 'DESC' | null>(null);
  const open = Boolean(anchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value.toLowerCase());
    setPage(0);
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [columnId]: value.toLowerCase()
    }));
    setPage(0);
  };

  const handleSortChange = (columnId: string, order: 'ASC' | 'DESC') => {
    setSortBy(columnId);
    setSortOrder(order);
    handleClose();
  };

  const filteredRows = rows.filter(row => {
    const matchesGlobalFilter = columns.some(column => {
      const rowValue = String(row[column.id]).toLowerCase();
      return rowValue.includes(globalFilter);
    });

    const matchesColumnFilters = columns.every(column => {
      const filterValue = filters[column.id];
      if (!filterValue) return true;
      const rowValue = String(row[column.id]).toLowerCase();
      return rowValue.includes(filterValue);
    });

    return matchesGlobalFilter && matchesColumnFilters;
  });

  const sortedRows = [...filteredRows];
  if (sortBy && sortOrder) {
    sortedRows.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'ASC' ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      return sortOrder === 'ASC'
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {/* Filter Row */}
            <TableRow>
              <TableCell>
                <Tooltip title="Sort columns">
                  <IconButton onClick={handleFilterClick}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: 400,
                      maxHeight: 400,
                    },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Sort Columns
                    </Typography>
                    {columns.map((column) => (
                      <Box key={column.id} mb={2}>
                        <Typography variant="body2">{column.label}</Typography>
                        <RadioGroup
                          row
                          aria-label={`sort-${column.id}`}
                          name={`sort-${column.id}`}
                          value={sortBy === column.id ? sortOrder : ''}
                          onChange={(e) => handleSortChange(column.id, e.target.value as 'ASC' | 'DESC')}
                        >
                          <FormControlLabel value="ASC" control={<Radio size="small" />} label="ASC" />
                          <FormControlLabel value="DESC" control={<Radio size="small" />} label="DESC" />
                        </RadioGroup>
                      </Box>
                    ))}
                  </Box>
                </Menu>
              </TableCell>
              <TableCell align="center" colSpan={columns.length}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Filter all columns"
                  value={globalFilter}
                  onChange={(e) => handleGlobalFilterChange(e.target.value)}
                />
              </TableCell>
            </TableRow>

            {/* Column Headers */}
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>

            {/* Column Filters */}
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={`filter-${column.id}`}
                  align={column.align}
                  style={{ top: 114, minWidth: column.minWidth }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder={`Filter ${column.label}`}
                    value={filters[column.id] || ''}
                    onChange={(e) => handleFilterChange(column.id, e.target.value)}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}