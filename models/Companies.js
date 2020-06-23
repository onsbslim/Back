'use strict'
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

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
            validate: { isEmail: true }
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
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postal_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }

    });

    Companies.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Companies.associate = (models)=>{
        models.companies.hasMany(models.documents);
        models.companies.hasMany(models.offers);
        models.companies.hasMany(models.photos);
    }
    
    return Companies;
};