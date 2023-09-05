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
module.exports = router;
