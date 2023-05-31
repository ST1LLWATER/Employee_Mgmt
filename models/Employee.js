const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming this is the file where the Sequelize connection is established
const Metadata = require('./Metadata');

const Employee = sequelize.define(
  'Employee',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return undefined;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return undefined;
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
      {
        type: 'FULLTEXT',
        name: 'first_name_last_name_idx',
        fields: ['first_name', 'last_name'],
      },
    ],
    tableName: 'employees',
    timestamps: true,
    underscored: true,
  }
);

Employee.hasOne(Metadata, {
  foreignKey: {
    name: 'employeeId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

module.exports = Employee;
