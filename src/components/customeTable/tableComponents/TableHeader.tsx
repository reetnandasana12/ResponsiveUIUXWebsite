import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { FilterInput } from './FilterInput';
import { TextField } from '@mui/material';

interface TableColumn {
    id: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    minWidth?: number;
  }
  

interface TableHeaderProps {
  columns: TableColumn[];
  filters: Record<string, string>;
  handleFilterChange: (columnId: string, value: string) => void;
}

export const TableHeader = ({ columns, filters, handleFilterChange }: TableHeaderProps) => (
  <TableHead>
    <TableRow>
      <TableCell align="center" colSpan={4}>
        Country
      </TableCell>
      <TableCell align="center" colSpan={1}>
        <TextField variant="outlined" size="small" fullWidth />
      </TableCell>
    </TableRow>
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
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={`filter-${column.id}`}
          align={column.align}
          style={{ top: 114, minWidth: column.minWidth }}
        >
          <FilterInput
            column={column}
            value={filters[column.id] || ''}
            onChange={(value) => handleFilterChange(column.id, value)}
          />
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);