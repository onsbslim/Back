'use strict'
var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
    var Companies = sequelize.define('companies', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {  isEmail: true}
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        about: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        founded:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size:{
            type: DataTypes.INTEGER,
            allowNull : true,
        },
        logo:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        cover: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        postal_code: {
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull:true,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull:true,
        },
        verified:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
        }

    });

    Companies.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    return Companies;
};