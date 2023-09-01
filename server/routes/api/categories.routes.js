const router = require('express').Router();

const { Category } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
