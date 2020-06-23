'use strict'

module.exports = function (sequelize, DataTypes) {
    var Skills = sequelize.define('skills', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        skill: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    });

    Skills.associate = (models) => {
        models.skills.belongsToMany(models.candidates, {
            through: 'CandidateSkill'

        });
        models.skills.belongsToMany(models.offers, {
            through: 'OfferSkill'

        });

    }



    return Skills;
};