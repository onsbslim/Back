'use strict'

module.exports = function (sequelize, DataTypes) {
    var Experiences = sequelize.define('experiences', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        years: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
       
        
    });

    Experiences.associate = (models) => {
        models.experiences.belongsTo(models.candidates);
    
    }

   
    return Experiences;
};