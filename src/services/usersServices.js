const usersData = require('../persistence/data/usersData.js')

async function login (username) {
    try {
        return await usersData.login(username);
    } catch (error) {
        console.error("Hubo un error en el userService al encontrar el usuario");
        throw error;
    }
}

async function register (newUser) {
    try {
        await usersData.register(newUser);
    } catch (error) {
        console.error("Hubo un error en el userService al crear el usuario");
        throw error;
    }
}

async function findByID (id) {
    try {
        return await usersData.findByID(id)
    } catch (error) {
        console.error("Hubo un error en el userService al buscar el ID");
        throw error;
    }
}

async function findByCartId (cartId) {
    try {
        return await usersData.findByCartId(cartId)    
    } catch (error) {
        console.error("no se encontro ese ID")
        throw error;
    }
}

function sessionConfig () {
    try {
        return usersData.sessionConfig()
    } catch (error) {
        console.error("Hubo un error en el userService al crear una seccion");
        throw error;   
    }
}

module.exports = {
    login,
    register,
    findByID,
    findByCartId,
    sessionConfig
}