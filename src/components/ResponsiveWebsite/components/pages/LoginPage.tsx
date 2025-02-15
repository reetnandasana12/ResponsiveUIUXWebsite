import { useForm, Controller, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const formSchema1 = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password is not match'),
});


type FormValues1 = z.infer<typeof formSchema1>;

export default function LoginPage() {

    const method1 = useForm<FormValues1>({
        resolver: zodResolver(formSchema1),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });


    const { handleSubmit, control, formState: { errors } } = method1;

    const onSubmit = () => {

        const data1 = method1.getValues()
        if (localStorage.getItem("name") === data1.name &&
            localStorage.getItem("email") === data1.email &&
            localStorage.getItem("password") === data1.password) {
            window.location.href = '/s';
        }
    };

    const navigate = useNavigate()
    function handleRegister() {
        navigate('/auth/register')
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper sx={{ p: 3 ,backgroundColor: '#f8f9fa!important'}}>
            <Typography variant='h5' sx={{ mb: 4 }}>Login Page</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button onClick={handleRegister} variant="outlined">
                        Register
                    </Button>
                    <Button type="submit" variant="contained" >
                        Login
                    </Button>
                </Box>
            </form>
            </Paper>
        </Container>
    );
}
