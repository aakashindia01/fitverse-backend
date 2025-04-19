module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Permission', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, unique: true },
    });
  };