'use strict'
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
    var Candidates = sequelize.define('candidates', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        about: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        industry: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cv: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            enum: ['admin', 'member'],
            required: true
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

    Candidates.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    Candidates.associate = (models)=>{
        models.candidates.hasMany(models.applications);
        models.candidates.hasMany(models.experiences);
        models.candidates.belongsToMany(models.skills, {
            through: "CandidateSkill"
        });
        
    };

    return Candidates;
};