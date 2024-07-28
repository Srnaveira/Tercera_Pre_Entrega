const productsModel = require('../models/products.model.js')

  
module.exports = {
    addProduct: async (newProduct) => {
        try {
            await productsModel.create(newProduct);
        } catch (error) {
            console.log("parece que hubo algun error en algunos de los campos ingresados")
            throw new Error({message: "Error en alguno de los campos del producto"})
        }
    },

    getAllProducts: async () => {
        try {
            return await productsModel.find()    
        } catch (error) {
            console.error("Error Al traer los productos");
            throw Error;
        }
    },

    getProductById: async (idProduct) => {
        try {
            return await productsModel.findOne({_id: idProduct});
        } catch (error) {
            console.error(`El id ingresado: ${idProduct} no corresponde a ningun id de productos`)
            throw Error;
        }
    },

    updateProduct: async (idProduct, productUpdate) => {
        try {
            let product = await productsModel.findOne({_id: idProduct})

            if(product){
                await productsModel.updateOne({_id: idProduct}, productUpdate);
                console.log("El producto fue Actualizado Correctamente")
                return
            }         
            throw new Error 

        } catch (error) {
            console.error(`El id ingresado: ${idProduct} no corresponde a ningun id de productos`)
            throw Error;
        }
    },

    deleteProduct: async (idProduct) => {
        try {
            const product = await productsModel.findOne({_id: idProduct});

            if(product){
                await productsModel.deleteOne({_id: idProduct})
                console.log("Product Eliminado")
                return
            }
            throw new Error(`El id ingresado: ${idProduct} no corresponde a ningun id de productos`)
        } catch (error) {
            console.error(`El id ingresado: ${idProduct} no corresponde a ningun id de productos`)
            throw Error;
        }
    },

    getProductByFilter: async (filter, limit, offset, sortOptions) => {
        try {
            const products = await productsModel.find(filter)
                .sort(sortOptions)
                .skip(offset)
                .limit(limit)
                .lean()

            return products;
        } catch (error) {
            console.error(`problemas al filtrar los resultados`)
            throw Error;
        }
    },

    totalProducts: async () => {
        try {
            const totalProducts = await productsModel.countDocuments()
            return totalProducts;
        } catch (error) {
            console.error(`problemas al filtrar los resultados`)
            throw Error;
        }
    }
}


