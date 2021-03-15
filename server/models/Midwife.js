// Need to import Model and DataTypes from Sequelize
const { Model, DataTypes } = require('sequelize');
// Need to look at the connection file
const sequelize = require('../config/connection');
// Nee to use bcrypt to crypt password
const bcrypt = require('bcrypt');

// Create the Midwife Model
class Midwife extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

// Define table columns and configuration
Midwife.init({
        id: {
            // Use the special Sequelize DataTypes object
            type: DataTypes.INTEGER,

            // Not Null option
            allowNull: false,

            // Instruct that this is primary key
            // The ID should be the primary key for the Midwife
            primaryKey: true,

            // Turn on auto increment
            autoIncrement: true
        },

        firstname: {
            // What datatype this midwife name is
            type: DataTypes.STRING,

            // Cannot be null
            allowNull: false
        },

        lastname: {
            // What datatype this midwife name is
            type: DataTypes.STRING,

            // Cannot be null
            allowNull: false
        },

        email: {
            // What datatype this email is
            type: DataTypes.STRING,

            // Cannot be null
            allowNull: false,

            // Has to be unique email
            unique: true,

            // Validation for email
            validate: {
                isEmail: true
            }
        },

        password: {
            // What datatype this password is
            type: DataTypes.STRING,

            // password cannot be null
            allowNull: false,

            validate: {
                // This means the password must be at least 4 characters long
                len: [4]
            }
        }
    },

    {
        hooks: {
            // set up beforeCreate lifeCycle "hook" functionality
            // This is for Create midwife functionality
            // gave saltRounds of 10
            async beforeCreate(newMidwifeData) {
                newMidwifeData.password = await bcrypt.hash(newMidwifeData.password, 10);
                return newMidwifeData;
            },

            // This is for Update midwife functionality
            // Gave saltRounds of 10
            async beforeUpdate(updatedMidwifeData) {
                updatedMidwifeData.password = await bcrypt.hash(updatedMidwifeData.password, 10);
                return updatedMidwifeData;
            }
        },
        // Pass imported Sequelize connection
        sequelize,

        // Automatically create createdAt/updatedAt timestamp fields
        timestamps: true,

        // Don't pluralize name of database table
        freezeTableName: true,

        // Use underscores instead of camel-casing
        underscored: true,

        // Make it so model name stays lowercase
        modelName: 'midwife'
    });

module.exports = Midwife;