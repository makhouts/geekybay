import {validate, ValidationError, Joi} from "express-validation";

//const { validate, ValidationError, Joi} = require('express-validation');
export const orderValidation = {
    body:Joi.object({
        productID: Joi.number()
            .required(),
        orderDate: Joi.date()
            .required(),
        orderStatus: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        sellerID: Joi.number()
            .required(),
        buyerID: Joi.number()
            .required(),
    })
}