import express from 'express';
process.loadEnvFile();
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req,res)=> res.send('Hello World!'));


app.listen(PORT, ()=> console.log(`Servidor conectado a puerto: PORT`));