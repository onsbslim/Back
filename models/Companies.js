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
            type: DataTypes.STRING(2000),
            
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
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        document: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        playerId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oneSignalId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Companies.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Companies.associate = (models)=>{
        models.companies.hasMany(models.documents);
        models.companies.hasMany(models.interviews);
        models.companies.hasMany(models.photos);
        models.companies.hasMany(models.experiences,{foreignKey: 'companyId', allowNull: true})
    }
    
    return Companies;
};