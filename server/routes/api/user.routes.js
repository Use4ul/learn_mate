const router = require('express').Router();

const { where } = require('sequelize');
const { Module, Category, Card, Group, GroupItem, User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch ({ message }) {
    res.json({ message });
  }
});
router.post('/', async (req, res) => {
  try {
    const { student_id, group_id } = req.body;
    const usersInGroupItem = await GroupItem.findOne({ where: { student_id, group_id } });
    if (!usersInGroupItem) {
      console.log(student_id, group_id);
      const user = await GroupItem.create({ student_id, group_id });
      console.log(user);
      const newUser = await GroupItem.findOne({ where: { student_id }, include: { model: User } });
      res.json(newUser);
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/:userId/modules', async (req, res) => {
  const { userId } = req.params;
  try {
    const modulesForUser = await Module.findAll({ where: { user_id: +userId } });
    res.json(modulesForUser);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/:userId/modules/stat', async (req, res) => {
  const { userId } = req.params;
  try {
    const modulesForUser = await Module.findAll({
      where: { user_id: +userId },
      include: { model: Card },
    });
    res.json(modulesForUser);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/modules/:moduleId', async (req, res) => {
  const { moduleId } = req.params;
  try {
    /*  const cardsInModule = await Card.findAll({ where: { module_id: +moduleId } });
    res.json(cardsInModule); */
    const cardsInModule = await Module.findAll({
      where: { id: +moduleId },
      include: [
        {
          model: Card,
        },
        {
          model: Category,
        },
      ],
    });

    res.json(cardsInModule);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    console.log(groupId);

    const oneGroup = await Group.findOne({
      where: { teacher_id: req.session.user_id, id: +groupId },
    });

    const result = await GroupItems.destroy({
      where: { order_id: order.id, medicine_id: delId },
    });
    console.log(result);
    if (result > 0) {
      res.json({ message: 'success' });
      return;
    }
    res.json({ message: 'false' });
  } catch ({ message }) {
    res.json(message);
  }
});

module.exports = router;
