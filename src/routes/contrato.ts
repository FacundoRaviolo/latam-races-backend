import { Router } from 'express';
import { ContratoController } from '../controller/ContratoController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], ContratoController.getAll);
router.post('/', ContratoController.add);
router.get('/:id', ContratoController.getById);
router.patch('/:id', ContratoController.edit);
router.delete('/:id', ContratoController.delete);

export default router;