const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Candidate = sequelize.define("Candidate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending','scheduled', 'completed', 'cancelled'),
    defaultValue: 'pending'
  }
});
Candidate.associate = function(models) {
  Candidate.hasMany(models.BookedSlot, { foreignKey: 'candidateId' });
};
module.exports = Candidate;
