import { Router } from 'express';
import { ClimaController } from '../controller/ClimaController';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

router.get('/', [checkJwt], ClimaController.getAll);
router.post('/', ClimaController.add);
router.get('/:id', ClimaController.getById);
router.patch('/:id', ClimaController.edit);
router.delete('/:id', ClimaController.delete);

export default router;