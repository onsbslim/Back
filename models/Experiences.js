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
       companyName: {
           type : DataTypes.STRING,
           allowNull: true
       },
       startingDate: {
           type: DataTypes.DATE,
           allowNull: true
       },
       endingDate: {
           type: DataTypes.DATE,
           allowNull: true
       },
       description: {
           type: DataTypes.STRING(1000),
           allowNull: true
       }
        
    });

    Experiences.associate = (models) => {
        models.experiences.belongsTo(models.candidates);
        models.experiences.belongsTo(models.companies);
    }

   
    return Experiences;
};