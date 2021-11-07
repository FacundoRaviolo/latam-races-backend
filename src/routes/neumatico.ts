import { Router } from 'express';
import { NeumaticoController } from '../controller/NeumaticoController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], NeumaticoController.getAll);
router.post('/', NeumaticoController.add);
router.get('/:id', NeumaticoController.getById);
router.patch('/:id', NeumaticoController.edit);
router.delete('/:id', NeumaticoController.delete);

export default router;