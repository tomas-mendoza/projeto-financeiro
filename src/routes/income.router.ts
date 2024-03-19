import { Router } from 'express';
import validate from '../middlewares/validateSchema';
import { createIncomeSchema, deleteIncomeSchema, updateIncomeSchema } from '../schemas/income.schema';
import { create, deleteIncome, list, search, update } from '../controllers/income.controller';

const router = Router();

router.post('/create', validate(createIncomeSchema), create);
router.get('/', list);
router.get('/:id', search);
router.patch('/update/:id', validate(updateIncomeSchema), update);
router.delete('/delete/:id', validate(deleteIncomeSchema), deleteIncome);

export default router;