import * as yup from 'yup';

const MIN_LENGTH = {
    name: 2,
    description: 5, // Adjusted minimum length for description
};

const MAX_LENGTH = {
    name: 20,
    description: 1000, // Adjusted maximum length for description
    price: 100000, // Adjusted maximum price
    stock: 100000, // Adjusted maximum stock
};

export const getProduct = {
    schema: {
        params: {
            yupSchema: yup.object().shape({
                id: yup.number().required(),
            }),
        },
    },
};

export const addProduct = {
    schema: {
        body: {
            yupSchema: yup.object().shape({
                name: yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name).required(),
                description: yup.string().min(MIN_LENGTH.description).max(MAX_LENGTH.description),
                price: yup.number().positive().max(MAX_LENGTH.price).required(), // Assuming price is a positive number
                stock: yup.number().integer().min(0).max(MAX_LENGTH.stock).required(), // Assuming stock is a non-negative integer
            }),
        },
    },
};

export const updateProduct = {
    schema: {
        params: {
            yupSchema: yup.object().shape({
                id: yup.number().required(),
            }),
        },
        body: {
            yupSchema: yup.object().shape({
                name: yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name),
                description: yup.string().min(MIN_LENGTH.description).max(MAX_LENGTH.description),
                price: yup.number().positive().max(MAX_LENGTH.price), // Assuming price is a positive number
                stock: yup.number().integer().min(0).max(MAX_LENGTH.stock), // Assuming stock is a non-negative integer
            }),
        },
    },
};

export const removeProduct = {
    schema: {
        params: {
            yupSchema: yup.object().shape({
                id: yup.number().required(),
            }),
        },
    },
};
