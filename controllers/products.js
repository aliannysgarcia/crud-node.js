import api from '../api/products.js'

// ----- GET Controller -----
const getProducts = async (req, res) => {
    const products = await api.getProducts();
    res.json(products);
};

const getProduct = async (req, res) => {
    const id = Number(req.params.id)
    const product = await api.getProduct(id);

    res.json(product);
};

// ----- POST Controller -----
const postProduct = async (req, res) => {
    // console.log(req.body)
    const {name, cost, category, stock, description} = req.body;
    const product = { name, cost, category, stock, description };
    const newProduct = await api.createProduct(product)

    res.json(newProduct);
};

// ----- PUT Controller -----
const putProduct = async (req, res) => {
    const id = Number(req.params.id) // convierte el valor id ingresado a traves de la solicitud HTTP a un número y lo asigna a la variable iç
    const {name, cost, category, stock, description} = req.body;
    const product = {id, name, cost, category, stock, description};
    
    const updateProduct = await api.updateProduct(id, product)
    res.json(updateProduct);
};

// ----- DELETE Controller -----
const deleteProduct = async (req, res) => {
    const id = Number(req.params.id);

    const removeProduct = await api.deleteProduct(id);

    res.json(removeProduct)
}

export default {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}