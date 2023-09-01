const router = require('express').Router();

const { Module } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.json(modules);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
