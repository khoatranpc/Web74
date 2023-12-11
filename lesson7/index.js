import express from 'express';
import RootRouter from './routes/index.js';

const app = express();
app.use(express.json());


app.use('/api', RootRouter);

app.listen(3005, () => {
    console.log('Run server!');
})