const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, require: true, minlength: 3, maxlength: 20 },
    phone: { type: Number, require: true, minlength: 10, maxlength: 10 }
});

const Customer = mongoose.model('Customer', customerSchema);

validateCustomer = (customer) => {
    const schema = Joi.object({
        isGold: Joi.boolean().default(false),
        name: Joi.string().min(3).max(20).required(),
        phone: Joi.number().min(10).required(),
    })
    return schema.validate({
        isGold: `${customer.isGold}`,
        name: `${customer.name}`,
        phone: `${customer.phone}`
    });
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;