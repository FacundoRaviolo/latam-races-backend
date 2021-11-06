import { Router } from 'express';
import auth from './auth';
import user from './user';
import pais from './pais';
import piloto from './piloto';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/paises', pais);
routes.use('/pilotos', piloto);

export default routes;