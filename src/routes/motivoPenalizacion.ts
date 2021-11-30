import { Router } from 'express';
import { MotivoPenalizacionController } from '../controller/MotivoPenalizacionController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], MotivoPenalizacionController.getAll);
router.post('/', MotivoPenalizacionController.add);
router.get('/:id', MotivoPenalizacionController.getById);
router.patch('/:id', MotivoPenalizacionController.edit);
router.delete('/:id', MotivoPenalizacionController.delete);

export default router;