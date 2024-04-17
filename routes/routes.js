import express from 'express'
import path from 'path';
import { addUserQuery, getUserQuery, updateUserQuery, deleteUserQuery,addTransferQuery, getTransferenciasQuery } from '../queries/consultas.js';

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

router.put('/usuario', async(req,res)=>{
    try{
        const {id} = req.query
        const {nombre,balance} = req.body

        const result = await updateUserQuery(nombre,balance,id);
        res.status(201).send(result)
    }catch(err){res.status(500).send(err)}
})

router.delete('/usuario', async (req,res)=>{
    try{
        const {id} = req.query;
        const result = await deleteUserQuery(id);
        res.status(201).send(result);
    }catch(err){res.status(500).send(err)}
})

router.post('/transferencia', async (req,res)=>{
    try{
        const {emisor,receptor,monto} = req.body
        const datos = [emisor,receptor,monto];
        const result = await addTransferQuery(datos);
        res.status(201).send(result)
    }catch(err){res.status(500).send(err)} 
})

router.get('/transferencias', async(req,res)=>{
    try{
        const result = await getTransferenciasQuery();
        res.status(201).json(result)
    }catch(err){res.status(500).send(err)}
})
 /* nos permite ver como se capturan los datos 
 console.log("query",req.query)
        console.log("params",req.params)
        console.log("body",req.body) */

export default router;