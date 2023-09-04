import z from 'zod';

const signupValidation = z.object({
  firstName: z.string().min(2).max(35),
  lastName: z.string().min(2).max(35),
  email: z.string().trim().toLowerCase().email(),
  age: z.number().min(18),
  password: z.string().min(5)
});

export default signupValidation;
