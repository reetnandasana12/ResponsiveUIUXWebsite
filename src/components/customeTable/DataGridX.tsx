import { Box, TextField } from '@mui/material';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'username',
        headerName: 'User name',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 110,
        editable: true,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
];


function initialState() {
    const data = [
        {
            name: 'reet',
            id: 1,
            email: 'reetnandasana@gmail.com',
            username:'reet'
        },
        
    ]
    return data
}

type UserData = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: object;
    phone: string;
    website: string;
    company: object;
};

function DataGridX() {
    const [data1, setData1] = useState(() => initialState());
    const [search, setSearch] = useState<string>(''); // Search input state

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users',
            {
                method: 'GET',
            }
        ).then(response => response.json())
            .then(json => cleanData(json))
    }, []);
    const cleanData = (data:UserData[]) => {
        setData1( data.map(({ id, name, email,username }) => ({ id, name, email,username })));
    };
    
    const filteredData = data1.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            
            <TextField
                label="Search by Name or Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <DataGrid
                rows={filteredData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 4,
                        },
                    },
                }}
                pageSizeOptions={[4]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default DataGridX
