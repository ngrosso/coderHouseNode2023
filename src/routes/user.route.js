import { Router } from 'express';
import auth from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";
import { list, deleteOne, getOne, save, update } from "../controllers/user.controller.js";

const usersRoute = Router();

usersRoute.get('/', auth, admin, list);
usersRoute.get('/:id', auth, admin, getOne);
usersRoute.post('/', auth, admin, save);
usersRoute.put('/:id', auth, admin, update);
usersRoute.delete('/:id', auth, admin, deleteOne);

export default usersRoute;
