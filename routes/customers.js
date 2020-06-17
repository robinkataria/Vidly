const express = require('express');
const router = express.Router();

const { Customer, validateCustomer } = require('../src/models/customer.model');

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post("/", async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
    await customer.save();

    res.send(customer);
})

router.put("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found!");

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    customer.set({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    customer.save();
    res.send(customer);
});

router.delete("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found!");

    const result = await Customer.deleteOne({ _id: req.params.id })
    res.send(customer);
})

module.exports = router;