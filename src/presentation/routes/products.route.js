import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import premiumUser from '../middlewares/premiumRole.middleware.js';
import { list, getOne, create, update, remove } from '../../presentation/controllers/products.controller.js';

const productsRouter = Router();

productsRouter.get('/', list);
productsRouter.get('/:id', getOne);
productsRouter.post('/',auth,premiumUser, create);
productsRouter.put('/:id',auth, premiumUser, update);
productsRouter.delete('/:id',auth, premiumUser, remove);

export default productsRouter;