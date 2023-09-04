const router = require('express').Router();

const { User, Group, Role } = require('../../db/models');

router.get('/', async (req, res) => {
  const currentUser = await User.findOne({
    where: { id: req.session.user_id },
    include: { model: Role },
  });
  try {
    if (currentUser && currentUser.Role.title === 'Учитель') {
      const groups = await Group.findAll({ where: { teacher_id: req.session.user_id } });
      res.json(groups);
      return;
    } else {
      res.json({ message: 'Ты не учитель, куда лезешь!' });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  try {
    if (req.session.user_id) {
      const currentUser = await User.findOne({
        where: { id: req.session.user_id },
      });
      const currentGroup = await Group.findOne({ where: { id: groupId } });
      if (currentGroup.teacher_id === req.session.user_id) {
        const result = await Group.destroy({ where: { id: groupId } });
        if (result > 0) {
          res.status(200).json(+groupId);
          return;
        }
      } else {
        res.json({ message: 'Не твое, не трож!' });
        return;
      }
    } else {
      res.json({ message: 'Вы не зарегестрированы' });
      return;
    }
  } catch ({ message }) {
    res.status(400).json({ message: 'Postman не пройдет' });
  }
});

module.exports = router;
