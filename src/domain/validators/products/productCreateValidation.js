import z from 'zod';

const productCreateValidation = z.object({
  title: z.string(),
  description: z.string().min(10),
  price: z.number().min(0),
  thumbnail: z.string().array(),
  code: z.string().min(6),
  category: z.string().min(3),
  stock: z.number().min(0),
  status: z.boolean()
});

export default productCreateValidation;
