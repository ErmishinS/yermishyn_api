import {
    createUser,
    getAllUsers,
    findUserById,
    updateUserById,
    deleteUserById,
    findUserByEmail,
} from '../models/userModel.js';
import AppError from '../utils/appError.js';
import handleAsync from '../utils/handleAsync.js';
import { validateRequiredFields } from '../utils/validator.js';

export const createNewUser = handleAsync(async (req, res) => {
    const userData = req.body;

    validateRequiredFields(userData);

    const user = await findUserByEmail(userData.email);
    if (Object.keys(user).length !== 0) {
        throw new AppError('User has already registered', 400);
    }

    await createUser(userData);
    res
        .status(201)
        .json({ status: 'success', message: 'User registered successfully' });
});

export const getUsers = handleAsync(async (req, res) => {
    const users = await getAllUsers();
    res.status(200).json({ status: 'success', message: users });
});

export const getUser = handleAsync(async (req, res) => {
    const { id } = req.params;
    const user = await findUserById(id);

    if (Object.keys(user).length === 0) {
        throw new AppError('User has not found', 404);
    }

    res.status(200).json({ status: 'success', message: user });
});

export const updateUser = handleAsync(async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    const user = await findUserById(id);

    if (Object.keys(user).length === 0) {
        throw new AppError('User has not found', 404);
    }

    const updatedUser = await updateUserById(id, userData);

    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        updatedUser,
    });
});

export const deleteUser = handleAsync(async (req, res) => {
    const { id } = req.params;

    const user = await findUserById(id);

    if (Object.keys(user).length === 0) {
        throw new AppError('User has not found', 404);
    }

    await deleteUserById(id);

    res.status(200).json({ message: 'User deleted successfully' });
});