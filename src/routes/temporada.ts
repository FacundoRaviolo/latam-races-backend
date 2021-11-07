import { Router } from 'express';
import { TemporadaController } from '../controller/TemporadaController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], TemporadaController.getAll);
router.post('/', TemporadaController.add);
router.get('/:id', TemporadaController.getById);
router.patch('/:id', TemporadaController.edit);
router.delete('/:id', TemporadaController.delete);

export default router;