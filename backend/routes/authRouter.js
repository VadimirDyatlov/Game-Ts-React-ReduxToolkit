const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Hero } = require('../db/models');

function authUser(user) {
  return {
    user: {
      id: user.id,
      name: user.name,
      gold: user.gold,
      avatar: user.avatar,
    },
  };
}

function createHero(userId) {
  return {
    user_id: userId,
    type: 1,
    hp: 100,
    speed: 4,
    damage: 8,
  };
}

authRouter.route('/checksession')
  .get((req, res) => {
    if (req.session.userId && res.locals.user) {
      res.status(200).json(authUser(res.locals.user));
    } else {
      res.status(401).json({ message: 'Сессия не найдена!' });
    }
  });

authRouter.route('/signup')
  .post(async (req, res) => {
    try {
      const {
        name, password, password2,
      } = req.body;

       if (password !== password2) {
        const message = 'Пароль не совпадает!';
        res.status(401).json({ message });
        return;
      }

      if (password.length < 8) {
        const message = 'Длина пароля не верная, минимум 8 символов!';
        res.status(401).json({ message });
        return;
      }

      const existingName = await User.findOne({ where: { name } });
      if (existingName) {
        const message = 'Пользователь с таким именем уже существует!';
        res.status(409).json({ message });
        return;
      }

      const user = await User.create({
        name,
        password: await bcrypt.hash(password, 8),
        avatar: 'false',
      });
      await Hero.create(createHero(user.id));

      req.session.userId = user.id;
      res.status(200).json(authUser(user));
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

authRouter.route('/signin')
  .post(async (req, res) => {
    try {
      const { name, password } = req.body;
      const existingUser = await User.findOne({ where: { name } });

      if (!existingUser) {
        res.status(404).json({ message: 'Пользователь не найден!' });
        return;
      }

      if (!(await bcrypt.compare(password, existingUser.password))) {
        res.status(401).json({ message: 'Неверный пароль!' });
        return;
      }

      req.session.userId = existingUser.id;
      res.status(200).json(authUser(existingUser));
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

authRouter.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie(process.env.SESSION_COOKIE);
    res.status(200).json({ message: 'Сессия уничтожена!' });
  });

module.exports = authRouter;
