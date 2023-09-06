const router = require('express').Router();

const { Card, Module, Group, Task, GroupItem } = require('../../db/models');

//получить модули назначенные группе, в которой состоит юзер
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const groupItem = await GroupItem.findAll({
      where: { student_id: +userId },
      include: { model: Group, include: { model: Task, include: {model: Module} } },
    });
    if (groupItem.length) {
      const groupToSend = groupItem.map((item) => item.Group)
      res.json(groupToSend);
    } else {
      res.json(0);
    }
  } catch ({ message }) {
    res.json({ message });
  }
});


router.post('/group', async (req, res) => {
  const { groups, id } = req.body;
  try {

    groups.map(async (group) => {
        const newTask = await Task.create({group_id: group.id, module_id: id})
    })

    res.json({message: 'success'})

  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
