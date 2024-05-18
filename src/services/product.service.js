import productDao from '../models/persistence/product.dao';

/**
 * Get all products.
 *
 * @returns {[]}
 */
const getAllProducts = () => productDao.getAll();

/**
 * Get a product from its ID.
 *
 * @param {integer} productId
 * @returns {T}
 */
const getProduct = (productId) => productDao.get(productId);

/**
 * Update a product.
 *
 * @param {integer} productId
 * @param details
 * @returns {boolean|*}
 */
const updateProduct = (productId, details) => productDao.update(productId, details);

/**
 * Add a product.
 *
 * @param {Object} details
 * @returns {*}
 */
const addProduct = (details) => productDao.insert(details);

/**
 * Remove a product.
 *
 * @param {integer} productId
 * @returns {*}
 */
const removeProduct = (productId) => productDao.remove(productId);

export default {
    getProduct,
    getAllProducts,
    updateProduct,
    addProduct,
    removeProduct
}
