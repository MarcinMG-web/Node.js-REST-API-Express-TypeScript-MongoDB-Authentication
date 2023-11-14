import { Router } from 'express';
import { getAllUsers } from '../controllers/users';

export default (router: Router) => {
  router.get('/users', getAllUsers);
};
