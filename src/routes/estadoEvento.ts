import { Router } from 'express';
import { EstadoEventoController } from '../controller/EstadoEventoController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], EstadoEventoController.getAll);
router.post('/', EstadoEventoController.add);
router.get('/:id', EstadoEventoController.getById);
router.patch('/:id', EstadoEventoController.edit);
router.delete('/:id', EstadoEventoController.delete);

export default router;