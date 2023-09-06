const router = require('express').Router();

const { Card, Module, Group, Task, GroupItem } = require('../../db/models');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const groupItem = await GroupItem.findAll({
      where: { student_id: +userId },
      include: { model: Group, include: { model: Task, include: {model: Module} } },
    });
    if (groupItem.length) {
      const groupToSend = groupItem.map((item) => item.Group)
    //   const correctAnswers = answers.filter((el) => el.isCorrect === true);
    //   const result = Math.round((correctAnswers.length / answers.length) * 100);
      res.json(groupToSend);
    } else {
      res.json(0);
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
