const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection')

class User extends Model {
    // Create a check PW using bcrypt
}

User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            } 
        }
    },
    {
        hooks: {
            beforeCreate: async(newUserData) => {
                // Creates a new encrypted PW using bcrypt
            },
            beforeUpdate: async(updateUserData) => {

            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
)

module.exports = User