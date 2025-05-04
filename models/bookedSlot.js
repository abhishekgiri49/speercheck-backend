const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Engineer = require("./engineer");
const Candidate = require("./candidate");

const BookedSlot = sequelize.define("BookedSlot", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  engineerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Engineer,
      key: "id",
    },
  },
  candidateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Candidate,
      key: "id",
    },
  },
});
BookedSlot.associate = function(models) {
    BookedSlot.belongsTo(models.Engineer, {
      foreignKey: 'engineerId',
      as: 'engineer',
      onDelete: 'CASCADE'
    });
    
    BookedSlot.belongsTo(models.Candidate, {
      foreignKey: 'candidateId',
      as: 'candidate',
      onDelete: 'CASCADE'
    });
  };
  
module.exports = BookedSlot;
