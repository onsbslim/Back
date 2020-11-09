'use strict'

module.exports = function (sequelize, DataTypes) {
    var Applications = sequelize.define('applications', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        explanation: {
            type: DataTypes.STRING,
            allowNull: true, 
        }
        
    });

    Applications.associate = (models) => {
        models.applications.belongsTo(models.interviews);
        models.applications.belongsTo(models.candidates);
        models.applications.hasMany(models.answers);
    }

    return Applications;
};