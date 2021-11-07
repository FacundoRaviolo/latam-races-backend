import { Router } from 'express';
import { CategoriaController } from '../controller/CategoriaController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], CategoriaController.getAll);
router.post('/', CategoriaController.add);
router.get('/:id', CategoriaController.getById);
router.patch('/:id', CategoriaController.edit);
router.delete('/:id', CategoriaController.delete);

export default router;