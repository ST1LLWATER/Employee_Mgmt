const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming this is the file where the Sequelize connection is established

const Metadata = sequelize.define(
  'Metadata',
  {
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      secondaryEmergencyContactPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isPhoneNumberValid(value) {
            const lengthRegex = /^.{10,15}$/; // Regex pattern for a string length between 10 to 15 characters
            if (!lengthRegex.test(value)) {
              throw new Error(
                'Contact phone number must be between 10 to 15 characters in length'
              );
            }
          },
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primaryEmergencyContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primaryEmergencyContactPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPhoneNumberValid(value) {
          const lengthRegex = /^.{10,15}$/; // Regex pattern for a string length between 10 to 15 characters
          if (!lengthRegex.test(value)) {
            throw new Error(
              'Primary emergency contact phone number must be between 10 to 15 characters in length'
            );
          }
        },
      },
    },
    primaryEmergencyContactRelationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondaryEmergencyContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondaryEmergencyContactPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPhoneNumberValid(value) {
          const lengthRegex = /^.{10,15}$/; // Regex pattern for a string length between 10 to 15 characters
          if (!lengthRegex.test(value)) {
            throw new Error(
              'Secondary emergency contact phone number must be between 10 to 15 characters in length'
            );
          }
        },
      },
    },
    secondaryEmergencyContactRelationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'metadata',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Metadata;
