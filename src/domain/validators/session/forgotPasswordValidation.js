import z from 'zod';

const loginValidation = z.object({
  email: z.string(),
  password: z.string().min(6),
  repeatPassword: z.string().min(6)
});

export default loginValidation;
