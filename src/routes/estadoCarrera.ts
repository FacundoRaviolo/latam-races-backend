import { Router } from 'express';
import { EstadoCarreraController } from '../controller/EstadoCarreraController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], EstadoCarreraController.getAll);
router.post('/', EstadoCarreraController.add);
router.get('/:id', EstadoCarreraController.getById);
router.patch('/:id', EstadoCarreraController.edit);
router.delete('/:id', EstadoCarreraController.delete);

export default router;