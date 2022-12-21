const { request, response } = require("express");
const pool = require("../db/connection");
const modeloEstacionamiento = require("../models/Estacionamiento");

const registro = async (req = request, res = response) =>{
    let conn;
    try {
        conn = await pool.getConnection()
        
        const Nombre = await conn.query(modeloEstacionamiento.queryregistro, (error) => {throw new Error(error) })
        
        if (!Nombre) {
            res.status(404).json({msg:"Sin registro del Dueño del Vehiculo"})
            return
        }
        res.json({Nombre})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const getCasetaByPlaca = async (req = request, res = response) =>{
    
    const {Placa} = req.params
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const [caseta] = await conn.query(modeloEstacionamiento.querygetCasetaByPlaca, [Placa], (error) => {throw new Error(error) })
        
        if (!Cliente) {
            res.status(404).json({msg: `No se encontro registro de Placa ${Placa}`})
            return
        }
        res.json({Cliente})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteAgentByID = async (req = request, res = response) =>{
    
    const {Placa} = req.query
    let conn;
    
    try {
        conn = await pool.getConnection()
       
        const {affectedRows} = await conn.query(modeloEstacionamiento.querydeleteAgentByID, [Placa], (error) => {throw new Error(error) })
       
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo eliminar el Vehiculo ${id}`})
            return
        }
 
        res.json({msg: `El Vehiculo ${id} ah salido del Estacionamiento`})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addDatos = async (req = request, res = response) =>{
    
    const {
        Nombre,
        Tiempo,
        Genero,
        folio,
        Color
    } = req.body

    if (
        !Nombre||
        !Tiempo ||
        !folio||
        !Genero ||
        !Color
    ){
        res.status(400).json({msg: "Datos sin sentido, corrija"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [clientes] = await conn.query(modeloEstacionamiento.queryAgentClientes, [Nombre])

        if (clientes) {
            res.status(403).json({msg: `La persona de Nombre ${Nombre} ya se encuentra registrado.`})
            return
        }

        const {affectedRows} = await conn.query(modeloEstacionamiento.queryaddCliente, 
        [Nombre,
       Color,
       folio,
        Genero,
        Activo
    ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No fue posible agregar el registro del cliente ${folio}`})
            return
        }
 
        res.json({msg: `El folio: ${folio} a sido registrado exitosamente `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updateUserByDatos = async (req = request, res = response) =>{
    
    const {
        Nombre,
        Tiempo,
        folio,
        Genero,
        Color
        
    } = req.body

    if (
        !Nombre||
        !Tiempo||
        !folio||
        !Genero||
        !Color 

    ) {
        res.status(400).json({msg: "Faltan registros"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloValorant.queryGetAgentInfo, [Usuario_Agente])
        
        if (!user) {
            res.status(403).json({msg: `El folio : ${folio} no se encuentra registrado.`})
            return
        }
         
        const {affectedRows} = await conn.query(modeloEstacionamiento.queryUpdateBydatos,
                [
                Nombre|| user.Nombre,
                Tiempo || user.Tiempo,
                Genero || user.Genero,
                folio|| user.folio,
                color|| user.color
           
            ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se acompleto la solicitud a nombre de: ${Nombre}, intente de nuevo`})
            return
        }
 
        res.json({msg: `La persona de nombre ${Nombre} se actualizo `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {queryregistro, getAgentByID,queryaddCliente, deleteAgentByID ,addDatos, updateUserByDatos, getCasetaByPlaca,addDatos} 