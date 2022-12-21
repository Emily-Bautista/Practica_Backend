//Servicio de Estacionamiento
//El proyecto, consiste en poder registrar y modificar a clientes que entren al estacionamiento y si tengan un folio 
// El folio es para ver las vicitas que ah realizado el cliente al estacionamiento
//Su ID identificador es la Placa que tenga el vehiculo

const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection"); // para hacer la conexion
const {modeloestacionamiento, updateEst} = require("../models/est"); // est solo abrevie Estacionamiento

const getUsers = async (req = request, res = response) =>{
    let conn;
    try {
        conn = await pool.getConnection()
        const clientes = await conn.query(modeloest.queryGetclientes, (error) => {throw new Error(error) })
        if (!clientes) {
            res.status(404).json({msg:"Sin entrada al estacionamiento"})
            return
        }
        res.json({clientes})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
// declaro que los registros sean por placas

const getCasetaByPlaca = async (req = request, res = response) =>{
    
    const {Placa} = req.params
    let conn;
    try {
        conn = await pool.getConnection()
        const [user] = await conn.query(modeloest.querygetcasetaByPlaca, [Placa], (error) => {throw new Error(error) })
// usamos una condicion
        if (!caseta) {
            res.status(404).json({msg: `Sin registron de placa ${Placa}`})
            return
        }
        res.json({caseta})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteCasetarByPlaca = async (req = request, res = response) =>{
    
    const {Placa} = req.query
    let conn;    
    try {
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloest.querydeleteCasetaByPlaca, [Placa], (error) => {throw new Error(error) })
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se Realizo la salida de la Placa  ${Placa}`})
            return
        }
 
        res.json({msg: `La salida de la placa ${Placa} ya fue efectuada`})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addCliente = async (req = request, res = response) =>{
    const {
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Placa,
        Telefono = '000000',
        Activo
    } = req.body

    if (
        !clientes ||
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Genero ||
        !Placa ||
        !Telefono||
        !Activo
    ){
        res.status(400).json({msg: "Complete los registros para entrar al Estacionamiento"})
        return
    }
    let conn; 
    try {
        conn = await pool.getConnection()
        const [caseta] = await conn.query(modeloest.querycasetaExists, [clientes])

        if (caseta) {
            res.status(403).json({msg: `El cliente ${clientes} tuvo registro previo`})
            return
        }
        
        const salt = bcryptjs.genSaltSync()
        const puntos = bcryptjs.hashSync(folio, salt)

        const {affectedRows} = await conn.query(modeloest.queryaddCliente, 
        [puntos,
        Nombre,
        Apellidos,
        Edad,
        Genero || '',
        folio,
        Activo
    ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No fue posible registrar a ${clientes}`})
            return
        }
 
        res.json({msg: `El cliente ${clientes} ahora puede sumar puntos `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updateCasetaBycliente = async (req = request, res = response) =>{
    
    const {
        Nombre,
        Apellidos,
        Edad,
        Genero,
        folio,
        puntos,
        Fecha_Nacimiento = '1900-01-01'
        
    } = req.body

    if (
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Usuario ||
        folio,
        puntos,
        !Contrasena 

    ) {
        res.status(400).json({msg: "Registro incompleto"})
        return
    }
}


   
module.exports={updateCasetaBycliente,getCasetaByPlaca,getCasetaByPlaca,deleteCasetaByPlaca,addCliente,updateCasetaByest,signIn,newPassword} 


