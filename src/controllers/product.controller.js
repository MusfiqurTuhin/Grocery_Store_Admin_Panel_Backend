import { StatusCodes } from 'http-status-codes';
import pino from 'pino';

const logger = pino();

import productService from '../services/product.service';

const STATUS = {
    success: true,
    failure: false
};

/**
 * @param req
 * @param res
 * @returns {*}
 */
const getAllProducts = (req, res) => {
    const products = productService.getAllProducts();

    if (products.length) {
        return res.status(StatusCodes.OK).send(products);
    }

    return res.status(StatusCodes.NOT_FOUND).send({
        status: STATUS.failure,
        message: 'No products found.',
    });
};

/**
 * Retrieve a product
 *.
 * @param req
 * @param res
 * @returns {*}
 */
const getProduct = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = productService.getProduct(id);

    if (product) {
        logger.info(`Retrieving product ID ${id} `);

        return res.status(StatusCodes.OK).send(product)
    }

    return res.status(StatusCodes.NOT_FOUND).send({
        status: STATUS.failure,
        message: `Product ${id} is not found.`,
    });
};

/**
 * Add a product.
 *
 * @param req
 * @param res
 * @returns {*}
 */
const addProduct = (req, res) => {
    const {body: product} = req;

    const addedProduct = productService.addProduct(product);

    logger.info('Creating a product');

    return res.status(StatusCodes.CREATED).send({
        status: STATUS.success,
        product: addedProduct,
    });
};

/**
 * Update a product.
 *
 * @param req
 * @param res
 * @returns {*}
 */
const updateProduct = (req, res) => {
    const {body: product} = req;

    const id = parseInt(req.params.id, 10);

    const updatedProduct = productService.updateProduct(id, product);

    if (updatedProduct) {
        logger.info(`Updating product ID ${id}`);

        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            product: updatedProduct,
        });
    } else {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `Product ${id} is not found.`,
        });
    }
};

/**
 * Remove a product.
 *
 * @param req
 * @param res
 * @returns {*}
 */
const removeProduct = (req, res) => {
    const { params } = req;

    const id = parseInt(params.id);
    const product = productService.getProduct(id);
    if (product) {
        productService.removeProduct(id);

        logger.info(`Removing product ID ${id}`);

        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            message: `Product ${id} has been deleted.`,
        });
    } else {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `Product ${id} hasn't been found.`,
        });
    }
};

export default {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    removeProduct
}
