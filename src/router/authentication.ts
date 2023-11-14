import { Router } from 'express';

import { login, register } from '../controllers/authentication';

export default (router: Router): void => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};
