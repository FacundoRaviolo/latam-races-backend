import { Router } from 'express';
import { CircuitoController } from '../controller/CircuitoController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], CircuitoController.getAll);
router.post('/', CircuitoController.add);
router.get('/:id', CircuitoController.getById);
router.patch('/:id', CircuitoController.edit);
router.delete('/:id', CircuitoController.delete);

export default router;