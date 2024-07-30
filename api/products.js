// import model from '../models/products-mem.js'
// import model from '../models/products-fs.js'
import model from '../models/products-mongodb.js'

//  ---- API Get all ----
const getProducts = async () => await model.readProducts();


//  ---- API Get one ----
const getProduct = async id => {
    const product = await model.readProduct(id);
    return product;
};


//  ---- API create ----
const createProduct = async product => {
    const createProduct = await model.createProduct(product)
    return createProduct;
};


//  ---- API Uptade ----
const updateProduct = async (id, product) => {
    const updateProduct = await model.updateProduct(id, product);
    return updateProduct;
};


//  ---- API Delete ----
const deleteProduct = async id => {
    const removeProduct = await model.deleteProduct(id);
    return removeProduct;
};

export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};