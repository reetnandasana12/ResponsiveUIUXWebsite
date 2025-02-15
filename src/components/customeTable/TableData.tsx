interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
}


function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  return { name, code, population, size };
}

const rows:Data[] = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];


interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

type GetDataProps = {
  page: number,
  pageSize: number
}

export function getData({ page, pageSize }: GetDataProps) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return rows.slice(startIndex, endIndex);
}

export function maxLen(): number {
  return rows.length;
}

export function getFilterData(data:Data,globalData:string){
  // const filteredRows = rows.filter(row =>
  //   Object.keys(data).every(key => row[key] && 
  //    ( (typeof row[key]=== 'string' && row[key].toString().toLowerCase().includes(data[key].toString().toLowerCase()))
  //   || (typeof row[key]=== 'number' && row[key].toString().includes(data[key].toString())) ))
  // );  
  // return filteredRows;
  return  rows.filter(row => {
      const matchesGlobalFilter = columns.some(column => {
        const rowValue = String(row[column.id]).toLowerCase();
        return rowValue.includes(globalData);
      });
  
      const matchesColumnFilters = columns.every(column => {
        const filterValue = data[column.id].toString();
        if (!filterValue) return true;
        const rowValue = (typeof row[column.id] === 'string')?String(row[column.id]).toLowerCase():String(row[column.id]);
        return rowValue.includes(filterValue);
      });
  
      return matchesGlobalFilter && matchesColumnFilters;
    });
}
export default rows;

