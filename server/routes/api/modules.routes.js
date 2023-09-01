const router = require('express').Router();

const { Module, Category } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const modules = await Module.findAll({ include: { model: Category } });
    res.json(modules);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
