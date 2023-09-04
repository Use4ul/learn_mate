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

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const currentUser = await User.findOne({
      where: { id: req.session.user_id },
      include: { model: Role },
    });
    if (currentUser && currentUser.Role.title === 'Учитель') {
      const newGroup = await Group.create({
        title,
        teacher_id: req.session.user_id,
      });
      res.json(newGroup);
      console.log(newGroup);
    } else {
      res.json({ message: 'Вы не учитель' });
      return;
    }
  } catch ({ message }) {
    res.json(message);
  }
});

// router.put('/:groupId', async (req, res) => {
//   const { groupId } = req.params;
//   const { title } = req.body;
//   try {
//     const group = await Group.findOne({ where: { id: groupId } });
//     if (oneModule.user_id === req.session.user_id) {
//       oneModule.title = title;
//       oneModule.category = categoryId;
//       oneModule.save();
//       res.json(oneModule);
//       return;
//     } else {
//       res.json({ message: 'Не отработал' });
//       return;
//     }
//   } catch ({ message }) {
//     res.json({ message });
//   }
// });

module.exports = router;
