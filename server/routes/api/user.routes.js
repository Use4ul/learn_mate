const router = require('express').Router();

const { Module, Category, Card } = require('../../db/models');

router.get('/:userId/modules', async (req, res) => {
  const { userId } = req.params;
  try {
    const modulesForUser = await Module.findAll({ where: { user_id: +userId } });
    console.log(modulesForUser);
    res.json(modulesForUser);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
