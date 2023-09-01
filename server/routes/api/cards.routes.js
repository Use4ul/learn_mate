const router = require('express').Router();

const { Card } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const cards = await Card.findAll();
    res.json(cards);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
