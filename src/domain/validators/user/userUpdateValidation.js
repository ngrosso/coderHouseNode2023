import z from 'zod';

const userUpdateValidation = z.object({
  firstName: z.string().min(2).max(35),
  lastName: z.string().min(2).max(35),
  email: z.string().trim().toLowerCase().email().optional().or(z.literal('')),
  age: z.number().min(18),
  password: z.string().min(5).optional().or(z.literal(''))
});

export default userUpdateValidation;
