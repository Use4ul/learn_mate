const router = require('express').Router();

const { Answer } = require('../../db/models');

router.get('/:cardId/progress', async (req, res) => {
  const { cardId } = req.params;
  try {
    const answers = await Answer.findAll({ where: { card_id: +cardId } });
    if (answers.length) {
      const correctAnswers = answers.filter((el) => el.isCorrect === true);
      const result = Math.round((correctAnswers.length / answers.length) * 100);
      res.json(result);
    } else {
      res.json(0);
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/', async (req, res) => {
  const { user_id, card_id, isCorrect } = req.body;
  console.log(user_id, card_id, isCorrect);
  try {
    const answer = await Answer.findOne({ where: { card_id, user_id } });
    if (answer) {
      answer.isCorrect = isCorrect;
      answer.save();
      const answers = await Answer.findAll({ where: { card_id } });
      const correctAnswers = answers.filter((el) => el.isCorrect === true);
      const result = Math.round((correctAnswers.length / answers.length) * 100);
      res.json(result);
    } else {
      const newAnswer = await Answer.create({ user_id, card_id, isCorrect });
      const correctAnswers = answers.filter((el) => el.isCorrect === true);
      const result = Math.round((correctAnswers.length / answers.length) * 100);
      res.json(result);
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
