import { Router } from 'express';
import auth from './auth';
import user from './user';
import pais from './pais';
import piloto from './piloto';
import categoria from './categoria';
import escuderia from './escuderia';
import circuito from './circuito';
import clima from './clima';
import plataforma from './plataforma';
import division from './division';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/paises', pais);
routes.use('/pilotos', piloto);
routes.use('/categorias', categoria);
routes.use('/escuderias', escuderia);
routes.use('/circuitos', circuito);
routes.use('/climas', clima);
routes.use('/plataformas', plataforma);
routes.use('/divisiones', division);

export default routes;