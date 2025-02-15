import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old').max(120, "That's not a valid age"),
});

type FormData = z.infer<typeof schema>;

const FirstController = () => {
  const {register, handleSubmit,formState:{errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register('name',{required:true})} />
      {errors.name && <p>{errors.name.message}</p>}

      <label>Email</label>
      <input {...register('email',{required:true})} />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Age</label>
      <input {...register('age',{required:true,valueAsNumber:true
      })} />
      {errors.age && <p>{errors.age.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FirstController;