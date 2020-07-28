'use strict'

module.exports = function (sequelize, DataTypes) {
    var Interviews = sequelize.define('interviews', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accepted_degree: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        experience_years: {
            type: DataTypes.INTEGER,
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
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
        
        
    });


    Interviews.associate = (models) => {
        models.interviews.belongsTo(models.companies);    
        models.interviews.hasMany(models.applications);
        models.interviews.hasMany(models.questions);
    }


   
    return Interviews;
};