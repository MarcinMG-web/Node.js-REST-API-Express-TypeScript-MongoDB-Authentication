import { Request, Response } from 'express';
import {
  getUsers,
  deleteUserById,
  updateUserById,
  getUserById,
} from '../db/users';

/**
 * Get all Users
 */
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (!users) {
      return res.sendStatus(400).json({
        message: 'No users',
      });
    }

    return res.status(200).json(users).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

/**
 * Deleted User by Id
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteUser = await deleteUserById(id);
    if (!deleteUser) {
      return res.sendStatus(400);
    }

    return res.status(200).json(deleteUser).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

/**
 * Update user by Id
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, userName } = req.body;
    // Check
    if (!email || !userName) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    // Updated user
    user.email = email;
    user.userName = userName;

    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
