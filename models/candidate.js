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
    type: DataTypes.ENUM('pending', 'scheduled', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  preferredDay: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Preferred day of week (Monday, Tuesday, etc.)",
    field: 'preferredDay' // Explicitly tell Sequelize to use camelCase
  },
  preferredStartTime: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Preferred start time (e.g., '2:00 PM')",
    field: 'preferredStartTime' // Explicit camelCase mapping
  },
  preferredEndTime: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Preferred end time (e.g., '5:00 PM')",
    field: 'preferredEndTime' // Explicit camelCase mapping
  }
}, {
  freezeTableName: true, // Prevents pluralization
  tableName: 'Candidates', // Explicit table name matching your DB
  underscored: false // Ensure this is false when using camelCase
});

Candidate.associate = function(models) {
  Candidate.hasMany(models.BookedSlot, { 
    foreignKey: 'candidateId' // Ensure this matches your DB column name
  });
};

module.exports = Candidate;