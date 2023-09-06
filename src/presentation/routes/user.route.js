import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';
import { list, deleteOne, getOne, save, update, switchPremiumStatus, addDocument, removeInactiveUsers, taskRemoveInactiveUsers } from '../../presentation/controllers/user.controller.js';
import { uploadDocs } from '../../utils/multer.js';

const usersRouter = Router();

usersRouter.get('/', auth, admin, list);
usersRouter.get('/:id', auth, admin, getOne);
usersRouter.post('/', auth, admin, save);
usersRouter.put('/:id', auth, admin, update);
usersRouter.delete('/:id', auth, admin, deleteOne);
usersRouter.post('/:id/documents', auth, uploadDocs, addDocument)
usersRouter.post('/:id/premium/', auth, switchPremiumStatus)
usersRouter.delete('/', auth, admin, removeInactiveUsers)
usersRouter.delete('/cron/toggle', auth, admin, taskRemoveInactiveUsers)


export default usersRouter;
