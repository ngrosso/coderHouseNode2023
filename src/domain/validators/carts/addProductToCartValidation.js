import z from 'zod';

const addProductToCartValidation = z.object({
  quantity: z.number().min(1),
});

export default addProductToCartValidation;
