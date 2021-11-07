import { Router } from 'express';
import { TipoSesionController } from '../controller/TipoSesionController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], TipoSesionController.getAll);
router.post('/', TipoSesionController.add);
router.get('/:id', TipoSesionController.getById);
router.patch('/:id', TipoSesionController.edit);
router.delete('/:id', TipoSesionController.delete);

export default router;