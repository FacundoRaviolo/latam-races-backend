import { Router } from 'express';
import { EscuderiaController } from '../controller/EscuderiaController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], EscuderiaController.getAll);
router.post('/', EscuderiaController.add);
router.get('/:id', EscuderiaController.getById);
router.patch('/:id', EscuderiaController.edit);
router.delete('/:id', EscuderiaController.delete);

export default router;