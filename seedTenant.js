const db = require('./src/models');

const createTenant = async () => {
  try {
    await db.sequelize.sync({ force: true });
    const tenant = await db.Tenant.create({
      name: 'Fitverse',
      address: '123 Fitverse Street, Gym City',
      mobileNumber: '9096565488',
      email: 'enquiry@fitversepro.com',
    });
    console.log('Tenant created:', tenant);
  } catch (err) {
    console.error('Error creating tenant:', err);
  }
};

createTenant();
