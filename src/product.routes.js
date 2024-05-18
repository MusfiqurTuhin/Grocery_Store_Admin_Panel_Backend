import express from 'express';
import { expressYupMiddleware } from 'express-yup-middleware';

import productController from './controllers/product.controller';
import { getProduct, addProduct, updateProduct, removeProduct } from './product.schemas';

const router = express.Router();

router.get('/all', productController.getAllProducts);

router.get(
    '/:id',
    expressYupMiddleware({
        schemaValidator: getProduct
    }),
    productController.getProduct
);

router.post(
    '/',
    expressYupMiddleware({
        schemaValidator: addProduct
    }),
    productController.addProduct
);

router.put(
    '/:id',
    expressYupMiddleware({ schemaValidator: updateProduct }),
    productController.updateProduct
);

router.delete(
    '/:id',
    expressYupMiddleware({ schemaValidator: removeProduct }),
    productController.removeProduct
);

export default router;
