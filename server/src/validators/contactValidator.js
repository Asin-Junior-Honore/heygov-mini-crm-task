const Joi = require('joi');


const createContactSchema = Joi.object({
    name: Joi.string().allow('', null),
    email: Joi.string().email().optional().allow(null),
    phone: Joi.string().allow('', null),
    notes: Joi.string().allow('', null)
}).custom((value, helpers) => {
    if (!value.name && !value.email) {
        return helpers.error('any.custom', 'At least one of name or email is required');
    }
    return value;
});


const updateContactSchema = Joi.object({
    name: Joi.string().allow('', null),
    email: Joi.string().email().optional().allow(null),
    phone: Joi.string().allow('', null),
    notes: Joi.string().allow('', null)
});


const addActivitySchema = Joi.object({
    type: Joi.string().valid('call', 'email', 'meeting', 'note').required(),
    notes: Joi.string().allow('', null),
    timestamp: Joi.date().optional()
});


module.exports = { createContactSchema, updateContactSchema, addActivitySchema };