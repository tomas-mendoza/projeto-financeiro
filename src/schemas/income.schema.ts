import { z } from 'zod';

export const createIncomeSchema = z.object({
  body: z.object({
    description: z.
      string({ required_error: 'You should insert a valid description!' }).
      min(1, { message: 'Your description shoud at least have 1 character!'}),
    value: z.
      number({ required_error: 'Your value should be a value!' }).
      min(0, { message: 'Your value should be higher than zero!' }),
    tag_id: z.
      number({ required_error: 'You should insert a valid description!' }).
      min(1, { message: 'You should insert a valid tag id! '}).
      optional()
  })
});

export const updateIncomeSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'You should insert a valid id! '})
  }),
  body: z.object({
    description: z.
      string({ required_error: 'You should insert a valid description!' }).
      min(1, { message: 'Your description shoud at least have 1 character!'}),
    value: z.
      number({ required_error: 'Your value should be a value!' }).
      min(0, { message: 'Your value should be higher than zero!' }),
    tag_id: z.
      number({ required_error: 'You should insert a valid description!' }).
      min(1, { message: 'You should insert a valid tag id! '}).
      optional()
  })
});

export const deleteIncomeSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'You should insert a valid id! '})
  })
});