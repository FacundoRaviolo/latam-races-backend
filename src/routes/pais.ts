import { Router } from 'express';
import { PaisController } from '../controller/PaisController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], PaisController.getAll);
router.post('/', PaisController.add);
router.get('/:id', PaisController.getById);
router.patch('/:id', PaisController.edit);
router.delete('/:id', PaisController.delete);

export default router;