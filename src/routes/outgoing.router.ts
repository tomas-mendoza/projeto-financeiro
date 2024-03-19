import { Router } from 'express';
import validate from '../middlewares/validateSchema';
import { createOutgoingSchema, deleteOutgoingSchema, updateOutgoingSchema } from '../schemas/outgoing.schema';
import { create, deleteOutgoing, list, search, update } from '../controllers/outgoing.controller';

const router = Router();

router.post('/create', validate(createOutgoingSchema), create);
router.get('/', list);
router.get('/:id', search);
router.patch('/update/:id', validate(updateOutgoingSchema), update);
router.delete('/delete/:id', validate(deleteOutgoingSchema), deleteOutgoing);

export default router;