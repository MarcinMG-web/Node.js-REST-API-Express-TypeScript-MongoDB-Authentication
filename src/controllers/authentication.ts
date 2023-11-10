import express from 'express';
import { createUsers, getUsersByEmail } from 'db/users';
import { random, authentication } from '../helpers';

/**
 * Register
 */

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, userName } = req.body;

    // Check user
    if (!email || !password || !userName) {
      return res.sendStatus(400).send('Miss param');
    }

    const existingUser = await getUsersByEmail(email);
    if (existingUser) {
      return res.sendStatus(400).send('User not exist');
    }

    // Create user
    const salt = random();
    const user = await createUsers({
      email,
      userName,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.sendStatus(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400).send('Something went wrong!');
  }
};
