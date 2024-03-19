import { z } from 'zod';

export const createTagSchema = z.object({
  body: z.object({
    description: z.
      string({ required_error: 'You should insert a valid description!' }).
      min(1, { message: 'Your description shoud at least have 1 character!'})
  })
});

export const updateTagSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'You should insert a valid id! '})
  }),
  body: z.object({
    description: z.
      string({ required_error: 'You should insert a valid description!' }).
      min(1, { message: 'Your description shoud at least have 1 character!'})
  })
});

export const deleteTagSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'You should insert a valid id! '})
  })
});