const { User } = require('../db/models');

async function getUser(req, res, next) {
  const id = req.session.userId;
  const userObj = id && await User.findByPk(id);
  res.locals.user = userObj;
  next();
}

module.exports = getUser;
