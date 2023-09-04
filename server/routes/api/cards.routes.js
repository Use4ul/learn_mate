const router = require('express').Router();

const { Card, Module } = require('../../db/models');

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

// удаление карточки из модуля
router.delete('/:cardId', async (req, res) => {
  const { cardId } = req.params;
  try {
    const oneCard = await Card.findOne({ where: { id: +cardId }, include: {model: Module} });
    if (oneCard.Module.user_id === req.session.user_id) {
      const result = await Card.destroy({ where: { id: +cardId } });
      if (result > 0) {
        res.json(+cardId);
        return;
      }
      res.json({ message: 'false' });
    } else {
      res.json({ message: 'Не отработал' });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
