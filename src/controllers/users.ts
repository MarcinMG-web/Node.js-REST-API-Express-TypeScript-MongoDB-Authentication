import { Request, Response } from 'express';
import { getUsers } from '../db/users';

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
