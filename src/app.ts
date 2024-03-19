import Express from 'express';

import tagRouter from './routes/tag.router';
import incomeRouter from './routes/income.router';
import outgoingRouter from './routes/outgoing.router';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

app.use('/tags', tagRouter);
app.use('/incomes', incomeRouter);
app.use('/outgoings', outgoingRouter);

export default app;