const router = require('express').Router();

const { User, Group, GroupItem, Role } = require('../../db/models');

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

router.get('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const currentUser = await User.findOne({
    where: { id: req.session.user_id },
    include: { model: Role },
  });
  const currentGroup = await Group.findAll({
    where: { id: groupId },
    include: { model: GroupItem, include: { model: User } },
  });
  try {
    if (currentUser && currentUser.Role.title === 'Учитель') {
      res.json(currentGroup[0].GroupItems);

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
      // const oneGroup = await Group.findOne({
      //   where: { id: newGroup.id },
      // });
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

router.put('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { title } = req.body;
  try {
    const group = await Group.findOne({ where: { id: groupId } });
    if (group.teacher_id === req.session.user_id) {
      group.title = title;
      group.save();
      res.json(group);
      return;
    } else {
      res.json({ message: 'Не отработал' });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:groupItemId/:groupId', async (req, res) => {
  const { groupItemId, groupId } = req.params;

  console.log(groupItemId);
  // const { id } = req.body;
  try {
    const groupItem = await GroupItem.findOne({ where: { id: +groupItemId } });
    console.log(groupItem);
    // if (groupItem.student_id === id) {
    const result = await GroupItem.destroy({ where: { id: groupItemId } });
    if (result > 0) {
      res.status(200).json(+groupItemId);
      return;
    }
    // } else {
    //   res.json({ message: 'Не твое, не трож!' });
    //   return;
    // }
  } catch ({ message }) {
    res.status(400).json({ message: 'Postman не пройдет' });
  }
});

module.exports = router;
