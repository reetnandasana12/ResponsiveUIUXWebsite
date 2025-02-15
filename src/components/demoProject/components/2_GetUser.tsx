import { useUserStore } from '../store/store';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/FetchData';

function GetUser() {
    const getUser1 = useUserStore((state) => state.getUser);
    const users = useUserStore((state) => state.users);

    const postQuery = useQuery({
        queryKey: ["getUser"],
        queryFn: getUser,
        refetchInterval:3000
    })

    if(postQuery.isSuccess){
        getUser1(postQuery.data)
    }
    return (
            <Paper sx={{ width: '90%',marginLeft:'5%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Age</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users!==null && users
                                .map((user) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                       
                                       <TableCell>{user.id}</TableCell>
                                       <TableCell>{user.name}</TableCell>
                                       <TableCell>{user.age}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
    )
}

export default GetUser
