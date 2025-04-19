const db = require('./src/models');

const seed = async () => {
  try {
    // Remove force: true to prevent dropping tables and deleting data
    await db.sequelize.sync({ force: true });

    // Define user types and permissions
    const userTypes = [
      'superAdmin',
      'tenantAdmin',
      'tenantManager',
      'tenantEmployee',
      'tenantMember',
    ];

    const permissions = [
      'createTenant',
      'manageStaff',
      'viewDashboard',
      'generateBills',
      'viewMembers',
      'assignPlans',
      'downloadReceipts',
      'viewWorkoutHistory',
      'checkInMember',
    ];

     
        await db.Tenant.create({
          name: 'Fitverse',
          address: '123 Fitverse Street, Gym City',
          mobileNumber: '9096565488',
          email: 'enquiry@fitversepro.com',
        });

    // Create user types and permissions in the database
    const userTypeInstances = await Promise.all(
      userTypes.map(async (name) => {
        const [userType, created] = await db.UserType.findOrCreate({
          where: { name },
          defaults: { name },
        });
        return userType;
      })
    );

    const permissionInstances = await Promise.all(
      permissions.map(async (name) => {
        const [permission, created] = await db.Permission.findOrCreate({
          where: { name },
          defaults: { name },
        });
        return permission;
      })
    );

    // Fetch the tenant dynamically
    const tenant = await db.Tenant.findOne({ where: { name: 'Fitverse' } });
    if (!tenant) {
      console.error('❌ Tenant not found');
      process.exit(1);
    }

    // Assign default permissions to roles
    const assign = async (roleName, permNames) => {
      const role = userTypeInstances.find((r) => r.name === roleName);
      for (const permName of permNames) {
        const perm = permissionInstances.find((p) => p.name === permName);
        await db.RolePermission.create({
          roleId: role.id,
          permissionId: perm.id,
        });
      }
    };

    // Create Super Admin Users (remove `userId` as it's auto-generated)
    const superAdminType = userTypeInstances.find((r) => r.name === 'superAdmin');

    const superAdmins = [
      {
        name: 'Aakash Singh',
        email: 'aakash.singh01@yahoo.com',
        userTypeId: superAdminType.id,
        userId: 'FI0001',
        tenantLogo: 'login/fitverseprobrandLogo.PNG',
        profilePhoto: 'avatars/avatar1m.png',
        password: 'Admin@2025',
        gender: 'Male',
        age: 28,
        tenantId: tenant.tenantId, // Dynamically fetch the tenantId
        mobileNumber: '9096565488',
        address: 'Mumbai',
        profilePhoto: null,
        docs: null,
        payTo: null,
        joiningDate: new Date(),
     },
      {
        name: 'Vivekanand R',
        email: 'vivekanand.iisc@gmail.com',
        userTypeId: superAdminType.id,
        userId: 'FI0002',
        tenantLogo: 'login/fitverseprobrandLogo.PNG',
        profilePhoto: 'avatars/avatar3m.png',
        password: 'Vivekanand@2025',
        gender: 'Male',
        age: 30,
        tenantId: tenant.tenantId, // Dynamically fetch the tenantId
        mobileNumber: '9955501110',
        address: 'Mumbai',
        profilePhoto: null,
        docs: null,
        payTo: null,
        joiningDate: new Date(),
      },
      {
        name: 'Abhishek Singh',
        email: 'enquiry@fitversepro.com',
        userId: 'FI0003',
        tenantLogo: 'login/fitverseprobrandLogo.PNG',
        profilePhoto: 'avatars/avatar1m.png',
        password: 'Admin@123',
        userTypeId: superAdminType.id,
        gender: 'Male',
        age: 29,
        tenantId: tenant.tenantId,
        mobileNumber: '7276226787',
        address: 'Mumbai',
        profilePhoto: null,
        docs: null,
        payTo: null,
        joiningDate: new Date(),
      },
    ];

    // Bulk create super admin users (userId will be auto-generated)
    await db.User.bulkCreate(superAdmins,  { individualHooks: true });
    console.log('👑 Super Admins created');

    // Assign permissions to super admin role (you can extend it for other roles)
    await assign('superAdmin', permissions);

    console.log('🌱 Seeded roles and permissions.');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};

seed();
