import Express from 'express';

import tagRouter from './routes/tag.router';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

app.use('/tags', tagRouter);

export default app;