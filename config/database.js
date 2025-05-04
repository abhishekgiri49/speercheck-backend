const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  'postgres://postgres.dmmgjpprllyycpmwgsyk:xKDRbmcnYcFynLky@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
  {
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  }
);
module.exports = sequelize;
