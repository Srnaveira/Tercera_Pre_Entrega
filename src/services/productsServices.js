const { productsData } = require('../persistence/factory.js')

async function addProduct (newProduct) {
    try {
        await productsData.addProduct(newProduct);
    } catch (error) {
        console.error("Hubo un problema en el productService function addProduct:", error);
        throw new Error("Hubo un problema en el productService function addProduct");
    }
}

async function getAllProducts () {
    try {
        return await productsData.getAllProducts();
    } catch (error) {
        console.error("Hubo un problema en el productService function getAllProducts:", error);
        throw new Error("Hubo un problema en el productService function getAllProducts");
    }
}

async function getProductById (idProduct) {
    try {
        return await productsData.getProductById(idProduct);
    } catch (error) {
        console.error("Hubo un problema en el productService function getProductById:", error);
        throw new Error("Hubo un problema en el productService function getProductById");
    }
}

async function updateProduct (idProduct, productUpdate) {
    try {
        await productsData.updateProduct(idProduct, productUpdate);
    } catch (error) {
        console.error("Hubo un problema en el productService function updateProduct:", error);
        throw new Error("Hubo un problema en el productService function updateProduct");
    }
}

async function deleteProduct (idProduct) {
    try {
        await productsData.deleteProduct(idProduct);
    } catch (error) {
        console.error("Hubo un problema en el productService function deleteProduct:", error);
        throw new Error("Hubo un problema en el productService function deleteProduct");
    }
}

async function getProductByFilter (filter, limit, offset, sortOptions) {
    try {
        return await productsData.getProductByFilter(filter, limit, offset, sortOptions);
    } catch (error) {
        console.error("Hubo un problema en el productService function getProductByFilter:", error);
        throw new Error("Hubo un problema en el productService function getProductByFilter");
    }
}

async function totalProducts (){
    try {
        return await productsData.totalProducts();
    } catch (error) {
        console.error("Hubo un problema al obtener el total de productos:", error);
        throw new Error("Hubo un problema al obtener el total de productos");
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByFilter,
    totalProducts
};
