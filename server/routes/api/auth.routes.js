const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');



router.post('/registration', async (req, res) => {
  try {
    console.log(req.body);
    let user;
    const { name, nickname, email, password, role } = req.body;
    if (name.trim() && nickname.trim() && email.trim() && password.trim()) {
      user = await User.findOne({ where: { email } });
      if (user) {
        res.json({ message: 'Ты куда полез? Она тебя сожрет!!!!!' });
        return;
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        user = await User.create({ name, nickname, email, password: hash, role });
        req.session.user_id = user.id;
        res.json(user);
        return;
      }
    } else {
      res.json({ message: 'Заполните все поля!' });
      return;
    }
  } catch ({ message }) {
    res.json(message);
  }
});

router.post('/authorization', async (req, res) => {
  try {
    console.log(req.body);
    let user;
    const { email, password } = req.body;
    if (email.trim() && password.trim()) {
      user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user_id = user.id;
        res.json({ message: 'success' });
        return;
      } else {
        res.json({ message: 'Неверный пароль или такого юзера нет' });
        return;
      }
    } else {
      res.json({ message: 'Заполните все поля!' });
      return;
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/check', async (req, res) => {
  try {
    if (req.session.user_id) {
      const user = await User.findOne({ where: { id: req.session.user_id } });
      res.json(user);
      return;
    }
    res.json(null);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get('/logout', (req, res) => {
  // удаление сессии на сервере
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при удалении сессии' });
    }
    res.clearCookie('user_sid').json({ message: 'success' }); // серверное удаление куки по имени
  });
});

module.exports = router;
