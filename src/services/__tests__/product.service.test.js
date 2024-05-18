import test from 'ava';

import productService from "../product.service";

let sampleProduct;

test.beforeEach(() => {
    sampleProduct = {
        name: 'Product 1',
        description: 'Description of Product 1',
        price: 10.99,
        stock: 100
    };
});

test.after(() => {
    if (productService.getProduct(2)) {
        console.info('Cleanup: Product 2 is being removed.')
        productService.removeProduct(2);
    }
})

test('must add a product', (t) => {
    const expectedId = 1;

    const product = productService.addProduct(sampleProduct);

    t.is(product.id, expectedId);
    t.deepEqual(product, {id: expectedId, ...sampleProduct});
});

test('must retrieve a product', (t) => {
    const expectedId = 1;

    const product = productService.getProduct(1);

    t.is(product.id, expectedId);
    t.deepEqual(product, {id: expectedId, ...sampleProduct});
});

test('must get all products', (t) => {
    // Create a second product
    productService.addProduct(sampleProduct);

    const products = productService.getAllProducts();

    t.deepEqual(products, [{id: 1, ...sampleProduct}, {id: 2, ...sampleProduct}]);
});

test('must update a product', (t) => {
    const productId = 1;

    const updatedDetails = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 19.99,
        stock: 50
    };

    const product = productService.updateProduct(productId, updatedDetails);

    t.is(product.id, productId);
    t.deepEqual(product, {id: productId, ...updatedDetails});
});

test('must delete a product', (t) => {
    const productId = 1;

    const expected = productService.removeProduct(productId);

    t.is(expected, undefined);

    // Trying to retrieve a removed product, and expect it to be "undefined"
    const product = productService.getProduct(productId);
    t.is(product, undefined);
});
