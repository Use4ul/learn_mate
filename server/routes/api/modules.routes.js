const router = require('express').Router();

const { Module, Category, Card } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const modules = await Module.findAll({ include: { model: Category } });
    res.json(modules);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/:moduleId', async (req, res) => {
  const { moduleId } = req.params;
  console.log(moduleId, '----------------');
  try {
    const cardsInModule = await Card.findAll({ where: { module_id: +moduleId } });
    res.json(cardsInModule);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
