const heroRouter = require('express').Router();
const { User, Hero } = require('../db/models');

function heroStatsObj(heroObj) {
  return {
    type: heroObj.type,
    hp: heroObj.hp,
    speed: heroObj.speed,
    damage: heroObj.damage,
  };
}

heroRouter.route('/sendskills')
  .post(async (req, res) => {
    try {
      const { skills, gold } = req.body;
      const { userId } = req.session;
      const hero = await Hero.findOne({ where: { user_id: userId, type: skills.type } });
      hero.hp = skills.hp;
      hero.damage = skills.damage;
      hero.speed = skills.speed;
      hero.save();
      const user = await User.findOne({ where: { id: userId } });
      user.gold = gold;
      user.save();
      res.status(200).json({ hero: heroStatsObj(hero) });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = heroRouter;
