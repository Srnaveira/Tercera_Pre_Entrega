const cartsData = require('../persistence/data/cartsData.js')

async function addCart (newCart) {
    try {
        await cartsData.addCart(newCart);    
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        throw error;
    }
}

async function getAllCarts () {
    try {
        return await cartsData.getAllCarts();
    } catch (error) {
        console.error("Error Al traer el los Carts");
        throw Error;
    }       
}

async function getCartById (idCart) {
    try {
        return await cartsData.getCartById(idCart); 
    } catch (error) {
        console.error(`Error al Buscar el Cart: ${idCart}`);
        throw Error;            
    }
}

async function deleteCart (idCart) {
    try {
        await cartsData.deleteCart(idCart);
    } catch (error) {
        console.error(`Error al Eliminar el Cart: ${idCart}`);
        throw Error;      
    }
}

async function addProductToCart (idCart, idProduct, quantity) {
    try {
        await cartsData.addProductToCart(idCart, idProduct, quantity);
    } catch (error) {
        console.error(`Error al Actualizar el Contenido del Cart: ${idCart}`);
        throw Error;   
    }
}

async function deletProductToCart (idCart, idProduct) {
    try {
        await cartsData.deletProductToCart(idCart, idProduct);
    } catch (error) {
        console.error(`Error al Eliminar el producto del Cart: ${idCart} indicado ${idProduct} `);
        throw Error; 
    }
}


module.exports = {
        addCart,
        getAllCarts,
        getCartById,
        deleteCart,
        addProductToCart,
        deletProductToCart
}