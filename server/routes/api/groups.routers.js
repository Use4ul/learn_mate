const router = require('express').Router();

const { User, Group, Role } = require('../../db/models');

router.get('/', async (req, res) => {
  const currentUser = await User.findOne({
    where: { id: req.session.user_id },
    include: { model: Role },
  });
  try {
    if (currentUser.Role.title === 'Учитель') {
      console.log('i am here');
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

module.exports = router;
