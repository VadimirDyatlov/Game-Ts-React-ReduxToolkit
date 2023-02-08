const gameRouter = require('express').Router();
const { User, Hero, Game } = require('../db/models');

function heroStatsObj(heroObj) {
  return {
    type: heroObj.type,
    hp: heroObj.hp,
    speed: heroObj.speed,
    damage: heroObj.damage,
    lvl: heroObj.lvl,
  };
}

gameRouter.route('/gethero')
  .get(async (req, res) => {
    try {
      const { userId } = req.session;
      const hero = await Hero.findOne({ where: { user_id: userId } });
      res.status(200).json({ hero: heroStatsObj(hero) });
    } catch (error) {
      console.log(error.message);
      res.status(502).json({ message: error.message });
    }
  });

gameRouter.route('/roundstats')
  .post(async (req, res) => {
    try {
      const { heroStats, gameStats } = req.body;
      const { userId } = req.session;

      const user = await User.findOne({ where: { id: userId } });
      user.gold += gameStats.gold;
      user.save();

      const hero = await Hero.findOne({ where: { user_id: userId, type: heroStats.type } });
      hero.lvl = heroStats.lvl;
      hero.save();

      await Game.create({
        user_id: userId,
        killings: gameStats.killings,
        gold: gameStats.gold,
        time: gameStats.gameTime,

      });
      res.status(200).json({ message: 'статистика сохранена' });
    } catch (error) {
      console.log(error);
      res.status(502).json({ message: error.message });
    }
  });

module.exports = gameRouter;
