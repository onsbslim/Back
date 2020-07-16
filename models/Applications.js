'use strict'

module.exports = function (sequelize, DataTypes) {
    var Applications = sequelize.define('applications', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        
    });

    Applications.associate = (models) => {
        models.applications.belongsTo(models.interviews);
        models.applications.belongsTo(models.candidates);
    }

    return Applications;
};