import { Request, Response, NextFunction } from 'express';
import { merge, get } from 'lodash';

import { getUserBySessionToken } from '../db/users';

/**
 * Owner
 */
export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // Get user identification
    const currentUserId = get(req, 'identity._id') as string;

    if (!id) {
      return res.json({
        status: 400,
        message: 'Miss id of user',
      });
    }

    if (!currentUserId) {
      return res.json({
        status: 403,
        message: 'Current users does`t have id',
      });
    }

    if (currentUserId.toString() !== id) {
      return res.json({
        status: 403,
        message: 'This user is not owner',
      });;
    }

    next();
  } catch (error) {
    return res.json({
      status: 400,
      message: `Something went wrong with: ${error}`,
    });
  }
};

/**
 * Authentication
 */
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['AUTHORIZATION-COOKIE'];
    if (!sessionToken) {
      return res.json({
        status: 403,
        message: 'Miss AUTHORIZATION-COOKIE',
      });
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.json({
        status: 403,
        message: 'This users does`t have session token',
      });
    }

    // Assigning user identification to the request object
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    return res.json({
      status: 400,
      message: `Something went wrong with: ${error}`,
    });
  }
};
