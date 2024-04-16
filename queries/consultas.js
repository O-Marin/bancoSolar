import pool from "../config/db.js"

const addUserQuery = async (datos)=>{
    try{
        const addUser = {
            text:'insert into usuarios (nombre,balance) values($1,$2) returning *',
            values:datos
        }

        const result = await pool.query(addUser);
        console.log(result.rows);
        return result.rows

    }catch(err){console.log(err)}

}

const getUserQuery = async () =>{
    try{
        const getUser = {
            text:'select * from usuarios',
        }
        const result = await pool.query(getUser);
        console.log(result.rows)
        return result.rows;
    }catch(err){console.log(err)}
}

const updateUserQuery = async (nombre,balance,id) => {
    try{
        const updateUser = {
            text:'update usuarios set nombre = $1, balance = $2 where id = $3 returning *',
            values: [nombre,balance,id]
        }
        const result = await pool.query(updateUser)
        //validacion de cambio
        if(result.rowCount === 0){
            throw new Error("No se edito el usuario");
        } else {
            result.rows[0];
        }

        console.log(result.rows);
        return result.rows
    }catch(err){console.log(err)}
}

const deleteUserQuery = async (id) =>{
    try{
        const deleteUser = {
            text:'delete from usuarios where id = $1 returning *',
            values: [id],
        }

        const result = await pool.query(deleteUser)
        //validacion de deleteo
        if(result.rowCount === 0){
            throw new Error("No se elimino el usuario");
        } else {
            result.rows[0];
        }

        return result.rows[0];
    }catch(err){console.log(err)}
}

const addTransferQuery = async (datos)=>{
    try{
        const { emisor, receptor, monto } = datos
        const { id: emisorId } = (

            await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
      
          ).rows[0];
      
          //buscamos el id del receptor
      
          const { id: receptorId } = (
      
            await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
      
          ).rows[0];

        const addTransfer = {
            text:'insert into transferencias (emisor,receptor,monto,fecha) values($1,$2,$3,$4) returning *',
            values:[emisorId,receptorId,monto];
        }
            

        const result = await pool.query(addTransfer);
        console.log(result.rows);
        return result.rows

    }catch(err){console.log(err)}

}

export {addUserQuery, getUserQuery, updateUserQuery,deleteUserQuery};