module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UserPermissionOverride', {
      userId: {
        type: DataTypes.UUID,
        references: { model: 'Users', key: 'userId' },
      },
      permissionId: {
        type: DataTypes.INTEGER,
        references: { model: 'Permissions', key: 'id' },
      },
      allow: DataTypes.BOOLEAN,
    });
  };
  