import mongoose from "mongoose";
import config from "../config.js"

let connected = false;

const connectDB = async () => { //conecta a la base de datos
    try {
        await mongoose.connect(config.MONGODB_CONNECTION_STRING, { //conecta a la base de datos
            serverSelectionTimeoutMS: config.MONGODB_CONNECTION_TIMEOUT // 2 segundos para que intente conectarse
        });
        console.log('Conectado a la base de datos de MongoDB')
        connected = true
    } catch (error) {
        console.error(`Error al conectar a la base de datos:, ${error.message}`)
    }
}


const productSchema = mongoose.Schema({ //crea el esquema de los productos
    name: String,
    cost: Number,
	category: String,
	stock: Number,
	description: String
});

const ProductsModel = mongoose.model('products', productSchema) //crea el modelo de los productos // 1er parametro: nombre de la coleccion, 2do parametro: esquema

//  ---- create ----
const createProduct = async product => {
    if (!connected) { //si no esta conectado a la base de datos
        console.error('Error en la conexión')
        return {};
    }
    try {
        const newProduct = new ProductsModel(product) 
        await newProduct.save() //guarda el producto en la base de datos
        return newProduct;
    } catch (error) {
        console.error(`Error al crear el producto: ${error.message}`)
        return {};
    }
};


//  ---- read ----
const readProducts = async () => {
    if (!connected) { 
        console.error('Error en la conexión')
        return [];
    }
    try {
        const products = await ProductsModel.find({})
        return products;
    } catch (error) {
        console.error(`Error al leer los productos: ${error.message}`)
        return []
    }
};

const readProduct = async id => { 
    if (!connected) { 
        console.error('Error en la conexión')
        return {};
    }
    try {
        const product = await ProductsModel.findOne({ _id: id}) || {};
        return product;
    } catch (error) {
        console.error(`Error al intentar obtener el producto: ${error.message}`)
        return {};

    }
}

//  ---- update ----
const updateProduct = async (id, product) => {
    if (!connected) { 
        console.error('Error en la conexión')
        return {};
    }
    try {
        const updatedProduct = await ProductsModel.findOneAndUpdate({ _id: id }, { $set: product }, { returnDocument: 'after' }); //1: busca el producto por id, 2: lo actualiza con el nuevo producto, 3: es para que devuelva el producto actualizado
        return updatedProduct;
    } catch (error) {
        console.error(`Error al intentar actualizar el producto: ${error.message}`);
        return {};
    }
};


//  ---- delete ----
const deleteProduct = async id => {
    if (!connected) { 
        console.error('Error en la conexión')
        return {};
    }
    try {
        const removedProduct = await ProductsModel.findByIdAndDelete(id) || {};
        return removedProduct;
    } catch (error) {
        console.error(`Error al intentar eliminar el producto: ${error.message}`)
    }
};


export default {
    createProduct,
    readProducts,
    readProduct,
    updateProduct,
    deleteProduct,
    connectDB
}