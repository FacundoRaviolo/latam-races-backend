import { Router } from 'express';
import { EventoController } from '../controller/EventoController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], EventoController.getAll);
router.post('/', EventoController.add);
router.get('/:id', EventoController.getById);
router.patch('/:id', EventoController.edit);
router.delete('/:id', EventoController.delete);

export default router;