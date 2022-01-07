import { Joi } from "express-validation";

export const orderValidation = {
  body: Joi.object({
    orderDate: Joi.date().iso().required(),
    // orderStatus: Joi.string()
    //     .regex(/[a-zA-Z0-9]{3,30}/)
    //     .required(),
    buyerID: Joi.number().integer().required(),
  }),
};

export const orderDetailValidation = {
  body: Joi.object({
    orderID: Joi.number().required(),
    productID: Joi.number().required(),
    quantityOrdered: Joi.number().required(),
    priceEach: Joi.number().required(),
    sellerID: Joi.number().required(),
    buyerID: Joi.number().integer().required(),
    orderStatus: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    confirmationDate: Joi.date().required(),
  }),
};

export const productValidation = {
  body: Joi.object({
    productName: Joi.string()
      .regex(/[a-zA-Z0-9\s.]{3,30}/)
      .required(),
    sellerID: Joi.number().integer().required(),
    productDescription: Joi.string()
      .regex(/[a-zA-Z0-9\s.]{3,3000}/)
      .required(),
    price: Joi.number().positive().required(),
    inStock: Joi.number().integer().required(),
    visible: Joi.bool().required(),
    productImg: Joi.string().regex(/[a-zA-Z0-9.]{3,30}/),
    freeShipping: Joi.bool().required(),
  }),
};

export const buyerValidation = {
  body: Joi.object({
    userLastName: Joi.string()
      .regex(/[a-zA-Z\s]{2,20}/)
      .required(),
    userFirstName: Joi.string()
      .regex(/[a-zA-Z\s]{2,20}/)
      .required(),
    emailAddress: Joi.string()
        .email()
        .required(),
    phone: Joi.string().regex(/[\d\s\/\+]{9,15}/),
    // .required(),
    addressLine1: Joi.string()
      .regex(/[a-zA-Z\d\s-]{2,20}/)
      .required(),
    addressLine2: Joi.string().regex(/[a-zA-Z\d\s-]{1,20}/),
    // .required(),
    postalCode: Joi.string()
      .regex(/[\d]{4,9}/)
      .required(),
    city: Joi.string()
      .regex(/[a-zA-Z\s-]{2,20}/)
      .required(),
    country: Joi.string()
      .regex(/[a-zA-Z\s-]{2,20}/)
      .required(),
  }),
};

export const sellerValidation = {
  body: Joi.object({
    userName: Joi.string()
      .regex(/[a-zA-Z\d\s\-_]{2,20}/)
      .required(),
    password: Joi.string().min(6).max(64).required(),
    userLastName: Joi.string().regex(/[a-zA-Z\s]{2,20}/),
    // .required(),
    userFirstName: Joi.string().regex(/[a-zA-Z\s]{2,20}/),
    // .required(),
    emailAddress: Joi.string().email().required(),
    phone: Joi.string().regex(/[\d\s\/\+]{9,15}/),
    // .required(),
    addressLine1: Joi.string().regex(/[a-zA-Z\d\s\-]{2,20}/),
    // .required(),
    addressLine2: Joi.string().regex(/[a-zA-Z\d\s\-]{1,20}/),
    // .required(),
    postalCode: Joi.string().regex(/[\d]{4,9}/),
    // .required(),
    city: Joi.string().regex(/[a-zA-Z\s\-]{2,20}/),
    // .required(),
    country: Joi.string().regex(/[a-zA-Z\s\-]{2,20}/),
    // .required(),
    type: Joi.string().regex(/seller/),
    // .required()
  }),
};
