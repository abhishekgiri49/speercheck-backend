const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Engineer = sequelize.define("Engineer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Engineer.associate = function(models) {
  Engineer.hasMany(models.BookedSlot, {
    foreignKey: 'engineerId',
    as: 'bookedSlots'
  });
};

module.exports = Engineer;
