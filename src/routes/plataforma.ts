import { Router } from 'express';
import { PlataformaController } from '../controller/PlataformaController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], PlataformaController.getAll);
router.post('/', PlataformaController.add);
router.get('/:id', PlataformaController.getById);
router.patch('/:id', PlataformaController.edit);
router.delete('/:id', PlataformaController.delete);

export default router;