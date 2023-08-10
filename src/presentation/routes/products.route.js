import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import { list, getOne, create, update, remove } from '../../presentation/controllers/products.controller.js';

const productsRouter = Router();

productsRouter.get('/', list);
productsRouter.get('/:id', getOne);
productsRouter.post('/',auth, create);
productsRouter.put('/:id',auth, update);
productsRouter.delete('/:id',auth, remove);

export default productsRouter;