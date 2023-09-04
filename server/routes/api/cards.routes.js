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
    const { term, definition, img, audio, module_id } = req.body;
    console.log('1', term, '2', definition, '3', img, '4', audio, '5', module_id);
    const newCard = await Card.create({
      term,
      definition,
      img,
      audio,
      module_id,
    });

    res.json(newCard);
  } catch ({ message }) {
    res.json(message);
  }
});
module.exports = router;
