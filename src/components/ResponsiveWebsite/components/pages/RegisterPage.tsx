import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '../../store/authStore';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password is must 8 letters long'),
    userType: z.enum(["admin", "user"], {
        required_error: "required one"
    }),
});
type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {

    const navigate = useNavigate()
    const setLogin = useLoginStore((state) => state.setLogin)
    const setType = useLoginStore((state) => state.setType)

    const method = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            userType: "user",
        }
    });
    const { handleSubmit, control, formState: { errors } } = method;

    const onSubmit = () => {
        // console.log(data)
        const data = method.getValues()
        localStorage.setItem("name", data.name)
        localStorage.setItem("email", data.email)
        localStorage.setItem("password", data.password)
        localStorage.setItem("userType", data.userType)
        setLogin(true)
        setType(data.userType)
        navigate('/user')

    };

    function handleLogin() {
        navigate('/auth/login')
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5, }}>
            <Paper sx={{ p: 3, backgroundColor: '#f8f9fa!important' }}>
                <Typography variant='h5'>Register Page</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
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
                        <Controller
                            name="userType"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup row {...field}>
                                    <FormControlLabel value="user" control={<Radio />} label="User" />
                                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                </RadioGroup>
                            )}
                        />

                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                        <Button onClick={handleLogin} variant="outlined">
                            Login
                        </Button>

                        <Button type="submit" variant="contained" >
                            Submit
                        </Button>

                    </Box>
                </form>
            </Paper>
        </Container >
    );
}
