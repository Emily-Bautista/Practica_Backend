const modeloUsuarios = {
    queryGetUsers: "SELECT * FROM Estacionamiento",
    querygetUserByID: `SELECT * FROM Clientes WHERE ID = ?`,
    querydeleteUserByID: `UPDATE Clientes SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Clientes FROM Usuarios WHERE Clientes = ?`,
    queryaddCliente: `
    INSERT INTO Clientes (
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Puntos,
        folio,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)`,
    queryDatosdeusuario:
    `SELECT Usuario, Nombre, Apellidos, Edad, Genero, telefono 
            FROM Clientes 
            WHERE Clientes = ?`,
    queryUpdateByCliente:
    `UPDATE Usuarios SET  
                Nombre = ?,
                Apellidos = ?,
                Edad = ?,
                Genero = ?,
                Telefono = ?
                folio = ?
                puntos = ?
                WHERE Usuario = ?`,
    
    queryfolio: `SELECT cliente, folio, Activo FROM Usuarios WHERE Usuario = ?`
    }
    
    const updateCasetaBycliente = (
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Usuario
    ) =>{
        return `
        UPDATE Usuarios SET  
        Nombre = '${Nombre}',
        Apellidos = '${Apellidos}',
        Edad = '${Edad}',
        Genero ='${Genero}',
        Fecha_Nacimiento = '${folio}'
        WHERE Usuario = '${cliente}'
         
    `}
    
    module.exports = {modeloest, queryUpdateByCliente, updateCasetaBycliente}