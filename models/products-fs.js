import {promises as fs} from 'fs';

const productsFile = 'products.dat';
const charset = 'utf-8';


const getProductsFromFile = async() => {
    let products = [];

    try {
        const fileContent = await fs.readFile(productsFile, charset);
        products = JSON.parse(fileContent);
    } catch (error) {
        console.error(error.message);
    }
    return products;
};

const saveProductsToFile = async products => {

    await fs.writeFile(productsFile, JSON.stringify(products, null, '\t'));
}

const getNextProductId = products => {
    const nextId = String(Number(products[products.length - 1].id) + 1);
    return nextId;
}

//  ---- create ----
const createProduct = async product => {
    const products = await getProductsFromFile();
    product.id = getNextProductId(products);
    products.push(product);
    await saveProductsToFile(products);
    return product;
};


//  ---- read ----
const readProducts = async () => {
    const products = await getProductsFromFile();
    return products;
};

const readProduct = async id => {
    const products = await getProductsFromFile();
    return products.find(prod => prod.id === id) || {};
}

//  ---- update ----
const updateProduct = async (id, product) => {
    const products = await getProductsFromFile();

    let index = products.findIndex(prod => prod.id === id)
    if (index ===  -1) { //si no se encontro
        return {};
    }
    products[index] = product;
    await saveProductsToFile(products);
    return product;
};


//  ---- delete ----
const deleteProduct = async id => {
    const products = await getProductsFromFile();

    let index = products.findIndex(prod => prod.id === id)
    if (index ===  -1) { //si no se encontro
        return {};
    }
    const removeProduct = products.splice(index, 1)[0];
    await saveProductsToFile(products);
    return removeProduct;
};


export default {
    createProduct,
    readProducts,
    readProduct,
    updateProduct,
    deleteProduct
}