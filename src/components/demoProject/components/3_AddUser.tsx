import { TextField, Button, Box } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { useUserStore } from '../store/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUser,addUser, getLength } from '../api/FetchData';

const formSchema = z.object({
    id: z.coerce.number().min(0, "Id must be grater then or equal to 0"),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    age: z.coerce.number().min(18, 'Must be at least 18 years old').max(120, "That's not a valid age"),
});

type FormData = z.infer<typeof formSchema>;


function AddUser() {

    const getUser1 = useUserStore((state) => state.getUser);

    const method = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 0,
            name: '',
            age: 19
        }
    });

    const { handleSubmit, control, formState: { errors } } = method;

    const lenQuery = useQuery({
        queryKey: ["getLength"],
        queryFn: getLength,
        refetchInterval:3000
    })
    if(lenQuery.isSuccess){
        method.setValue("id",lenQuery.data+1)
    }

    function set(){
        const data = getUser();
        const data2 = method.getValues();
        console.log(data2)
        getUser1({...data,...data2})
    }

    const {mutate} = useMutation({
        mutationFn:()=>addUser(method.getValues()),
        onSuccess:()=>{
            set()
        }
    })

    const onSubmit = () => {
        mutate()
        console.log(method.getValues())
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Controller
                        name="id"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="id"
                                error={!!errors.id}
                                helperText={errors.id?.message}
                                disabled
                                
                            />
                        )}
                    />
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="age"
                                error={!!errors.age}
                                helperText={errors.age?.message}
                            />
                        )}
                    />

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>

                    <Button type="submit" variant="contained" >
                        Submit
                    </Button>

                </Box>
            </form>
        </Box>
    )
}

export default AddUser
