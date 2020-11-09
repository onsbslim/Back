'use strict'

module.exports = function (sequelize, DataTypes) {
    var InterviewSkill = sequelize.define('InterviewSkill', {
        skillId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: 'skills',
                key: 'id'
            }
        },
        interviewId:{
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: 'interviews',
                key: 'id'
            }
        }
    });

    
    return InterviewSkill;
};