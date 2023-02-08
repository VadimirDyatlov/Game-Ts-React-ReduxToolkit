const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Hero.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    type: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    hp: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    speed: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    damage: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    lvl: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Hero',
    tableName: 'Heroes',
  });
  return Hero;
};
