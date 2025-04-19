module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UserType', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, unique: true },
    });
};