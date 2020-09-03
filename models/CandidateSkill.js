'use strict'

module.exports = function (sequelize, DataTypes) {
    var CandidateSkill = sequelize.define('CandidateSkill', {
        skillId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: 'skills',
                key: 'id'
            }
        },
        candidateId:{
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: 'candidates',
                key: 'id'
            }
        }
    });
    
    return CandidateSkill;
};