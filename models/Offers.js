'use strict'

module.exports = function (sequelize, DataTypes) {
    var Offers = sequelize.define('offers', {
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
        
        
        
    });


    Offers.associate = (models) => {
        models.offers.belongsTo(models.companies);    
        models.offers.hasMany(models.interviews);
        models.offers.hasMany(models.questions);
        models.offers.belongsToMany(models.skills, {
            through: 'OfferSkill'

        });
    }


   
    return Offers;
};