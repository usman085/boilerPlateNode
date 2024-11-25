'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   
    }
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
    // This method can be called to get the JSON data to send to the client
    toJSON() {
      // returns an object with all the fields of the user except the password
      const values = { ...this.get() };
      delete values.password;  // Remove password from JSON data
      return values;
    }
  }
  Users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};