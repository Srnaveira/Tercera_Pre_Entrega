const productsServices = require('../services/productsServices.js');


async function addProduct (req, res) {
    try {
        const newProduct = req.body;
        await productsServices.addProduct(newProduct);
        res.status(201).json({message: "Product Agregado Correctamente", product: newProduct});
    } catch (error) {
        console.error("Error al agregar el producto: ", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message});
    }
}

async function getAllProducts (req, res) {
    try {
        const allProducts = productsServices.getAllProducts();
        return res.status(200).render('home', allProducts);
    } catch (error) {
        console.error("Error al traer los producto: ", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message});
    }
}

async function getProductById (req, res) {
    try {
        const idProduct = req.params.pid;
        const productIsValid = await productsServices.getProductById(idProduct); 

        if(productIsValid){
            res.status(200).json(productIsValid); 
        } else {
            res.status(404).json({message: "El producto Solicitado No existe"});
        }
    } catch (error) {
        console.error("hubo algun problema: ", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

async function updateProduct (req, res) {
    try {
        const idProduct = req.params.pid;
        const productUpdate = req.body;
        await productsServices.updateProduct(idProduct, productUpdate);
        res.status(200).json({message: "Producto Actualizado"});
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({  message: "Error interno del servidor", error: error.message}); 
    }
}

async function deleteProduct (req, res) {
    try {
        const idProduct = req.params.pid;
        await productsServices.deleteProduct(idProduct);
        res.status(200).json({message: "Producto Eliminado Correctamente"})
    } catch (error) {
        console.error("Error al borrar el Producto", error)
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
}

async function getProductByFilter (req, res) {
    let {limit = 10, page= 1, sort, query } = req.query
    limit = parseInt(limit);
    page = parseInt(page);
    try {
        let filter = {};
        if(query){
            filter = {
                $or: [
                    { category: query },
                    { status: query.toLowerCase() === 'true' } // Comparar como booleano
                ]
            };
        }
        let sortOptions = {};
        if (sort) {
           sortOptions.price = sort === 'asc' ? 1 : -1;
        }
        const totalProducts = await productsServices.totalProducts()

        const totalPages = Math.ceil(totalProducts / limit);
        const offset = (page - 1) * limit;

        const products = await productsServices.getProductByFilter(filter, limit, offset, sortOptions)

        const user = req.session.user || null;

        const response = {
            status: "success",
            isUser: !!user,
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort || ''}&query=${query || ''}` : null,
            nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort || ''}&query=${query || ''}` : null
        };
        return res.status(200).render('products', response)
    } catch (error) { 
        console.error("error al leer el archivo", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

async function realTimeProducts (req, res) {
    try {
        res.render('realtimeproducts', {} );
    } catch (error) {
        console.error("Error al renderizar realtimeproducts", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByFilter,
    realTimeProducts
}