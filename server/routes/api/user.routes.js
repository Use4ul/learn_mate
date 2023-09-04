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

/* router.put('/modules/:moduleId', async (req, res) => {
  try {
    const { moduleId } = req.params;

    const { title, description, img } = req.body;

    const post = await Post.findOne({ where: { id: postId } });

    if(post.user_id === req.session.user_id){

    const [result] = await Post.update(
      { title, description, img },
      { where: { id: postId, user_id: req.session.user_id } },
    );
    if (result > 0) {
      res.json({ message: 'success' });
      return;
    }
  }
    res.json({ message: 'false' });
  } catch ({ message }) {
    res.json(message);
  }
}); */

module.exports = router;
