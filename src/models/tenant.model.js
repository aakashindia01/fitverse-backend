const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Tenant = sequelize.define('Tenant', {
      tenantId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // auto-generate UUID
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
      },
      mobileNumber: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  
    // Association with User model
    Tenant.hasMany(sequelize.models.User, { foreignKey: 'tenantId' }); // tenant has many users
    sequelize.models.User.belongsTo(Tenant, { foreignKey: 'tenantId' }); // user belongs to a tenant
  
    return Tenant;
  };
  