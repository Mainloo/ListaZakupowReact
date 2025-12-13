import express from 'express';
import cors from 'cors';
import productsRouter from './routes/productsRoutes'; 
import listsRouter from './routes/listsRoutes';       

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/lists', listsRouter);

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});