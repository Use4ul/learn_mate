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

/* router.post('/', async (req, res) => {
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
}); */

router.post('/', async (req, res) => {
  try {
    const { term, definition, audio, module_id } = req.body;
    let img = req.files?.img;
    const newCard = await Card.create({
      term: term || null,
      definition: definition || null,
      img: req.files?.img?.name || null,
      audio: audio || null,
      module_id: module_id || null,
    });
    if (img) {
      img.mv(`${__dirname}/../../assets/${img.name}`, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    return res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json(console.log(error.message));
  }
});

// удаление карточки из модуля
router.delete('/:cardId', async (req, res) => {
  const { cardId } = req.params;
  try {
    const oneCard = await Card.findOne({ where: { id: +cardId }, include: { model: Module } });
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
