import { useForm, Controller, useFieldArray, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box,
    Button,
    Container,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';


const formSchema1 = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
});
const formSchema2 = z.object({
    phone: z.array(z.string().length(10, "phone length is must be 10")).min(1, "Must be one phone required")
});

type FormValues1 = z.infer<typeof formSchema1>;
type FormValues2 = z.infer<typeof formSchema2>;

const steps = ['Personal Info', 'Phone Info'];

type ob = {
    name:string,
    email:string,
    phone:string
}
export default function MultiStepForm() {
    const [finalData,setFinalData] = useState<ob[]>([]);
    const [activeStep, setActiveStep] = useState(0);


    const method1 = useForm<FormValues1>({
        resolver: zodResolver(formSchema1),
        defaultValues: {
            name: 'Reet',
            email: '',
        }
    });
    const method2 = useForm<FormValues2>({
        resolver: zodResolver(formSchema2),
        defaultValues: {
            phone: []
        }
    });

    const { handleSubmit: handleSubmit1, control: control1, formState: { errors: errors1 } } = method1;
    const { handleSubmit: handleSubmit2, control, formState: { errors: errors2 } } = method2;


    const { fields, append, remove } = useFieldArray({
        control,
        name: "phone"
    });

    useEffect(() => {
        append('')
    }, [append])
    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
        // console.log(data);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const onSubmit = () => {

        const data1 = method1.getValues()
        localStorage.setItem("name", data1.name)
        localStorage.setItem("email", data1.email)

        const data2 = method2.getValues()
        localStorage.setItem("phone", JSON.stringify(data2.phone))
        setActiveStep(0);
        data2.phone.map(value=>
            finalData.push({phone:value,
                ...data1
            })
        )
    };

    return (
        <Container maxWidth="sm">
            <Stepper activeStep={activeStep} sx={{ my: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <form onSubmit={handleSubmit2(onSubmit)}>
                {activeStep === 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Controller
                            name="name"
                            control={control1}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    error={!!errors1.name}
                                    helperText={errors1.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control1}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    type="email"
                                    error={!!errors1.email}
                                    helperText={errors1.email?.message}
                                />
                            )}
                        />
                    </Box>
                )}

                {activeStep === 1 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {fields.map((field, index) => {
                            return (
                                <div key={field.id} >
                                    <section className={"section"} >
                                        <Controller
                                            name={`phone.${index}`}
                                            control={control}
                                            render={({ field: field1 }) => (
                                                <TextField
                                                    {...field1}
                                                    label="Phone"
                                                    error={!!errors2.phone?.[index]}
                                                    helperText={errors2.phone?.[index]?.message || ""}
                                                    // inputProps={{    }}
                                                    type='number'
                                                    
                                                                                 />
                                            )}
                                        /><br />
                                        <button type="button" onClick={() => remove(index)}>
                                            DELETE
                                        </button>
                                    </section>
                                </div>
                            );
                        })}
                        <button
                            type="button"
                            onClick={() =>
                                append(
                                    ''
                                )
                            }
                        >
                            APPEND
                        </button>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    {activeStep !== 0 && (
                        <Button onClick={handleBack} variant="outlined">
                            Back
                        </Button>
                    )}
                    {activeStep < steps.length - 1 ? (
                        <Button onClick={handleSubmit1(handleNext)} variant="contained">
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" variant="contained" >
                            Submit
                        </Button>
                    )}
                </Box>
            </form>
            <Divider sx={{ my: 2 }} />
            {/* <Grid2 container spacing={2}>
                <Grid2 size={4}>
                    Name
                </Grid2>
                <Grid2 size={8}>
                    {method1.getValues().name}
                </Grid2>
                <Grid2 size={4}>
                    Email
                </Grid2>
                <Grid2 size={8}>
                    {method1.getValues().email}
                </Grid2>
                <Grid2 size={4}>
                    Phone
                </Grid2>
                <Grid2 size={8}>
                    {method2.getValues().phone.map(((value, index) =>
                        <div key={index}>{value}</div>
                    ))}
                </Grid2>
            </Grid2> */}
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {finalData.map(((value, index) =>

                        <TableRow key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="right">{value.name}</TableCell>
                            <TableCell align="right">{value.email}</TableCell>
                            <TableCell align="right">{value.phone}
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

        </Container>
    );
}
