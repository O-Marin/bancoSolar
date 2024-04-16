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

export {addUserQuery, getUserQuery, updateUserQuery};