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
import estadoCarrera from './estadoCarrera';
import estadoEvento from './estadoEvento';
import neumatico from './neumatico';

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
routes.use('/estados-carrera', estadoCarrera);
routes.use('/estados-evento', estadoEvento);
routes.use('/neumaticos', neumatico);

export default routes;