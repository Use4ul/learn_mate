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

router.post('/', async (req, res) => {
  try {
    const { term, definition, img, audio, id } = req.body;
    const newCard = await Card.create({
      term,
      definition,
      img,
      audio,
      module_id: id,
    });

    res.json(newCard);
  } catch ({ message }) {
    res.json(message);
  }
});
module.exports = router;
