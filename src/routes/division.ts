import { Router } from 'express';
import { DivisionController } from '../controller/DivisionController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], DivisionController.getAll);
router.post('/', DivisionController.add);
router.get('/:id', DivisionController.getById);
router.patch('/:id', DivisionController.edit);
router.delete('/:id', DivisionController.delete);

export default router;