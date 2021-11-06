import { Router } from 'express';
import { PilotoController } from '../controller/PilotoController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], PilotoController.getAll);
router.post('/', PilotoController.add);
router.get('/:id', PilotoController.getById);
router.patch('/:id', PilotoController.edit);
router.delete('/:id', PilotoController.delete);

export default router;