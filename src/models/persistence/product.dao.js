import products from '../data/products.data';

const get = (productId) => products.find((product) => product.id === productId);

const getAll = () => products;

/**
 * Update a product from its ID.
 *
 * @param {integer} productId
 * @param {Object} newDetails
 * @returns {boolean|*}
 */
const update = (productId, newDetails) => {
    let existingProduct = null;
    let productIndex;

    products.forEach((product, index) => {
        if (product.id === productId) {
            existingProduct = product;
            productIndex = index;
        }
    });

    if (!existingProduct) {
        return false;
    }

    const updatedProduct = {
        ...existingProduct,
        ...newDetails
    };

    products.splice(productIndex, 1, updatedProduct);

    return updatedProduct;
};

/**
 * Insert a product.
 *
 * @param {Object} details
 * @returns {*&{id: number}}
 */
const insert = (details) => {
    const newProduct = {
        id: products.length + 1,
        ...details
    };

    products.push(newProduct);

    return newProduct;
};

/**
 * Remove a product from its ID.
 *
 * @param {integer} productId
 * @returns {*}
 */
const remove = (productId) => {
    const deletedProductIndex = products.findIndex((product) => product.id === productId);
    
    if (deletedProductIndex === -1) {
        return null;
    }

    return products.splice(deletedProductIndex, 1)[0];
};

export default {
    get,
    getAll,
    update,
    insert,
    remove,
};
