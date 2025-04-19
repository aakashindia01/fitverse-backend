const { hashPassword } = require("../utils/password.util");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.STRING, unique: true },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      tenantLogo:{ type: DataTypes.STRING },
      userTypeId: { type: DataTypes.INTEGER, allowNull: false },
      tenantId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Tenants',
          key: 'tenantId',
        },
      },  
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      gender: { type: DataTypes.STRING },
      age: { type: DataTypes.INTEGER },
      mobileNumber: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      profilePhoto: { type: DataTypes.STRING },
      docs: { type: DataTypes.JSONB },
      payTo: { type: DataTypes.JSONB },
      joiningDate: { type: DataTypes.DATE },
    });
  
    // Auto-generate userId before create
    User.beforeCreate(async (user, options) => {
        user.password = await hashPassword(user.password);
        console.log('Pass',user.password)
    //     const Tenant = sequelize.models.Tenant;
      
    //     console.log('tenantId:', user.tenantId); // Debug log
      
    //     const tenant = await Tenant.findByPk(user.tenantId);
    //     if (!tenant) throw new Error('Invalid tenantId');
      
    //     const prefix = tenant.name.slice(0, 2).toUpperCase();
    //     console.log("prefix", prefix)
        
    //     // Get latest user with this prefix
    //     const lastUser = await User.findOne({
    //       where: {
    //         userId: {
    //           [sequelize.Sequelize.Op.iLike]: `${prefix}%`,
    //         },
    //       },
    //       order: [['createdAt', 'DESC']],
    //     });
    //     console.log("lastUser.userId", lastUser)
    //     let nextId = 1;
    //     if (lastUser && lastUser.userId) {
            
    //       const numPart = parseInt(lastUser.userId.slice(2)); // e.g. from FU0002 → 2
    //       nextId = numPart + 1;
    //     }

    //     console.log("nextId", nextId)
      
    //     const padded = String(nextId).padStart(4, '0');
    //     user.userId = `${prefix}${padded}`;
   });
      
  
    return User;
  };
  