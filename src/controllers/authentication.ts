import { Request, Response } from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

/**
 * Login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check provided value
    if (!email || !password) {
      return res.json({
        status: 400,
        message: 'Miss params email or password',
      });
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) {
      return res.json({
        status: 400,
        message: 'User not exists',
      });
    }

    // Authentication user
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.json({
        status: 403,
        message: 'Authentication issue',
      });
    }

    // Updated User session token
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    // Set the cookie
    res.cookie('AUTHORIZATION-COOKIE', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res
      .json({
        status: 200,
        message: 'Ok',
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

/**
 * Register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;

    // Check user
    if (!email || !password || !userName) {
      return res.json({
        status: 400,
        message: 'Miss params email, password or userName',
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.json({
        status: 400,
        message: 'User exists',
      });
    }

    // Create user
    const salt = random();
    const user = await createUser({
      email,
      userName,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res
      .json({
        status: 201,
        message: 'Ok',
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
