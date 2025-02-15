import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";

// 1. Define Zod schema
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.coerce
    .number()
    .min(18, "Must be at least 18 years old")
    .max(120, "That's not a valid age"),
});

type FormData = z.infer<typeof schema>;

export default function Test() {
  // 2. Initialize useForm with Zod resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "", 
      age: 18,
    },
  });

  // 3. Submit handler
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form data:", data);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Form
        </Typography>

        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Age Field */}
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Age"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}