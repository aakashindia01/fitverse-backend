module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RolePermission', {
      roleId: {
        type: DataTypes.INTEGER,
        references: { model: 'UserTypes', key: 'id' },
      },
      permissionId: {
        type: DataTypes.INTEGER,
        references: { model: 'Permissions', key: 'id' },
      },
    });
  };