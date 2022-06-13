const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection')

class User extends Model {
    // Create a check PW using bcrypt
    checkPassword(LoginPw) {
        return bcrypt.compareSync(LoginPw, this.password);
    }
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
                newUserData.password = await bcrypt.hash(newUserData.password, 10)
                return newUserData
            },
            beforeUpdate: async(updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
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