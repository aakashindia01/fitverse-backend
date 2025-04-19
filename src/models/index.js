const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT,
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);
db.UserType = require('./userType.model')(sequelize, Sequelize);
db.Permission = require('./permission.model')(sequelize, Sequelize);
db.RolePermission = require('./rolePermission.model')(sequelize, Sequelize);
db.UserPermissionOverride = require('./userPermissionOverride.model')(sequelize, Sequelize);
db.Tenant = require('./tenant.model')(sequelize, Sequelize);

// Associations
db.UserType.hasMany(db.User, { foreignKey: 'userTypeId' });
db.User.belongsTo(db.UserType, { foreignKey: 'userTypeId' });

db.Tenant.hasMany(db.User, {
    foreignKey: 'tenantId',
    onDelete: 'CASCADE', // Optional, helps remove users when tenant is deleted
});
db.User.belongsTo(db.Tenant, {
    foreignKey: 'tenantId',
});

db.User.belongsToMany(db.Permission, {
  through: db.UserPermissionOverride,
  as: 'overrides',
  foreignKey: 'userId',
});
db.UserType.belongsToMany(db.Permission, {
  through: db.RolePermission,
  as: 'permissions',
  foreignKey: 'roleId',
});
db.Permission.belongsToMany(db.UserType, {
  through: db.RolePermission,
  foreignKey: 'permissionId',
});

module.exports = db;
