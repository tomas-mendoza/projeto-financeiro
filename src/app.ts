import Express from 'express';

import tagRouter from './routes/tag.router';
import incomeRouter from './routes/income.router';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

app.use('/tags', tagRouter);
app.use('/incomes', incomeRouter);

export default app;