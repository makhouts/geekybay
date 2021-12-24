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
            .required(),
        freeShipping: Joi.bool()
            .required(),
    })
}

//regex password?
export const userValidation = {
    body: Joi.object({
        userName: Joi.string()
            .regex(/[a-zA-Z0-9\s.]{3,300}/)
            .required(),
        password: Joi.string()
            .regex(/[\S]{8,255}/)
            .required(),
        userLastName: Joi.string()
            .regex(/[a-zA-Z\s.]{2,20}/)
            .required(),
        userFirstName: Joi.string()
            .regex(/[a-zA-Z\s.]{2,20}/)
            .required(),
        emailAddress: Joi.string()
            .email()
            .required(),
        phone: Joi.string()
            //validation phone number?
            .required(),
        addressLine1: Joi.string()
            .regex(/[a-zA-Z0-9\s.-]{3,30}/)
            .required(),
        addressLine2: Joi.string()
            .regex(/[a-zA-Z0-9\s.-]{1,30}/)
            .required(),
        city: Joi.string()
            .regex(/[a-zA-Z]{2,20}/)
            .required()
    })
}