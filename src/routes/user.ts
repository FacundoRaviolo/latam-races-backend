import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], UserController.getAll);
router.post('/', UserController.add);
router.get('/:id', UserController.getById);
router.patch('/:id', UserController.edit);
router.delete('/:id', UserController.delete);

export default router;