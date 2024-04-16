import express from 'express'
import path from 'path';
import { addUserQuery, getUserQuery } from '../queries/consultas.js';

const router = express.Router()
const __dirname = import.meta.dirname;




router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/index.html'))
})

router.post('/usuario', async (req,res)=>{
    try{
        const {nombre,balance}= req.body;
        const datos = [nombre,balance];

        const result = await addUserQuery(datos);
        res.status(201).send(result.rows);
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/usuarios', async (req,res)=>{
    try{
        const result = await getUserQuery();
        res.status(201).json(result)
    }catch(err){res.status(500).send(err)}
    
})

export default router;