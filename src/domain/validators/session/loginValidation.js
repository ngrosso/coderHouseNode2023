import z from 'zod';

const loginValidation = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(5)
});

export default loginValidation;
