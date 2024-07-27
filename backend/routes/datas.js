const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

router.get('/', async (req, res) => {
  try {
    const datas = await Data.find();
    res.json(datas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
});

router.get('/:filter', async (req, res) => {
    const filter = req.params.filter;
    try {
        const datas = await Data.find().distinct(filter);
        res.json(datas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:filter/:value', async (req, res) => {
    const filter = req.params.filter;
    const value = req.params.value;
    try {
        const datas = await Data.find({ [filter]: value });
        res.json(datas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
