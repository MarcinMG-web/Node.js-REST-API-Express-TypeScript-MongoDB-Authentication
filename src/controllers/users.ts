import { Request, Response } from 'express';
import { getUsers, deleteUserById, getUserById } from '../db/users';

/**
 * Get all Users
 */
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (!users) {
      return res.json({
        status: 400,
        message: 'Empty users',
      });
    }

    return res
      .json({
        status: 200,
        message: 'Ok',
        data: users,
      })
      .end();
  } catch (error) {
    return res.json({
      status: 400,
      message: `Something went wrong with: ${error}`,
    });
  }
};

/**
 * Deleted User by Id
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        status: 400,
        message: 'Miss id of user',
      });
    }

    const deleteUser = await deleteUserById(id);
    if (!deleteUser) {
      return res.json({
        status: 400,
        message: 'User by this id doesn`t exists',
      });
    }

    return res
      .json({
        status: 200,
        message: 'This user has been deleted',
        data: deleteUser,
      })
      .end();
  } catch (error) {
    return res.json({
      status: 400,
      message: `Something went wrong with: ${error}`,
    });
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

    if (!id) {
      return res.json({
        status: 400,
        message: 'Miss id of user',
      });
    }
    if (!email || !userName) {
      return res.json({
        status: 400,
        message: 'Miss params email or password',
      });
    }

    const user = await getUserById(id);

    // Updated user
    user.email = email;
    user.userName = userName;

    await user.save();

    return res
      .json({
        status: 200,
        message: 'This user has been updated',
        data: user,
      })
      .end();
  } catch (error) {
    return res.json({
      status: 400,
      message: `Something went wrong with: ${error}`,
    });
  }
};
