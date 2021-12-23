import {Joi} from "express-validation";

export const orderValidation = {
    body: Joi.object({
        productID: Joi.number()
            .integer()
            .required(),
        orderDate: Joi.date()
            .iso()
            .required(),
        orderStatus: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        sellerID: Joi.number()
            .integer()
            .required(),
        buyerID: Joi.number()
            .integer()
            .required(),
    })
}
    //"productName": "guitar1",
    //         "sellerID": 1,
    //         "productDescription": "stringy1",
    //         "price": 1000,
    //         "available": 1


export const productValidation = {
    body: Joi.object({
        productName: Joi.string()
            .regex(/[a-zA-Z0-9\s.]{3,300}/)
            .required(),
        sellerID: Joi.number()
            .integer()
            .required(),
        productDescription: Joi.string()
            .regex(/[a-zA-Z0-9\s.]{3,300}/)
            .required(),
        price: Joi.number()
            .positive()
            .required(),
        inStock: Joi.number()
            .integer()
            .required(),
        visible: Joi.bool()
            .required()
    })
}