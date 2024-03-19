import { Router } from 'express';
import { create, deleteTag, list, search, update } from '../controllers/tag.controller';
import validate from '../middlewares/validateSchema';
import { createTagSchema, deleteTagSchema, updateTagSchema } from '../schemas/tag.schema';

const router = Router();

router.post('/create', validate(createTagSchema), create);
router.get('/', list);
router.get('/:id', search);
router.patch('/update/:id', validate(updateTagSchema), update);
router.delete('/delete/:id', validate(deleteTagSchema), deleteTag);

export default router;