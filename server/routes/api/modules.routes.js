const router = require('express').Router();

const { Module, Category, Card } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const modules = await Module.findAll({ include: { model: Category } });
    res.json(modules);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/:moduleId', async (req, res) => {
  const { moduleId } = req.params;
  console.log(moduleId);
  try {
    const cardsInModule = await Card.findAll(
      { where: { module_id: +moduleId } },
      { order: [['id', 'ASC']] },
    );
    console.log(cardsInModule);
    res.json(cardsInModule);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/:moduleId', async (req, res) => {
  const { moduleId } = req.params;
  const { title, categ } = req.body;
  console.log(title);
  try {
    const category = await Category.findOne({ where: { title: categ } });
    const categoryId = category.id;
    const oneModule = await Module.findOne({ where: { id: +moduleId } });
    if (oneModule.user_id === req.session.user_id) {
      oneModule.title = title;
      oneModule.category_id = categoryId;
      oneModule.save();
      res.json(oneModule);
      return;
    } else {
      res.json({ message: 'Не отработал' });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
