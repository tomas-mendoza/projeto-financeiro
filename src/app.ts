import Express from 'express';

const app = Express();

app.use(Express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

export default app;