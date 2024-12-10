import express from 'express';
import {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';

const userRouter = new express.Router();

userRouter.post('/user', createUser);
userRouter.get('/user', getUsers);
userRouter.get('/user/:id', getUser);
userRouter.patch('/user/:id', updateUser);
userRouter.delete('/user/:id', deleteUser);

export default userRouter;