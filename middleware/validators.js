const Joi = require("joi");
const validator = require('express-joi-validation').createValidator({
    // This options forces validation to pass any errors the express
    // error handler instead of generating a 400 error
    passError: true
});
exports.signup = validator.body(Joi.object({
    userName: Joi.string().min(5).required(),
    userEmail: Joi.string().email().required(),
    password: Joi.string().min(5).required().label('password'),
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().label("Confirm Password").messages({ 'any.only': '{{#label}} does not match' }),
}))

exports.login = validator.body(Joi.object({
    userEmail: Joi.string().email().required(),
    password: Joi.string().min(5).required()
}))

exports.createTask = validator.body(Joi.object({
    userId: Joi.string().min(5).required(),
    status: Joi.string().min(4).required(),
    description: Joi.string().min(5).required(),
    title: Joi.string().min(5).required()
}))

exports.modifyTask = validator.body(Joi.object({
    taskId: Joi.string().min(5).required(),
    type: Joi.string().min(5).required().valid('update', 'delete'),
    description: Joi.string().when('type', {
        is: "update",
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    title: Joi.string().when('type', {
        is: "update",
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    status: Joi.string().when('type', {
        is: "update",
        then: Joi.required(),
        otherwise: Joi.optional()
    })
}))
