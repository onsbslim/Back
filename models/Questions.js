'use strict'

module.exports = function (sequelize, DataTypes) {
    var Questions = sequelize.define('questions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text_question: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        audio_question: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        
        
    });


    Questions.associate = (models) => {
        models.questions.belongsTo(models.interviews);   
        models.questions.hasMany(models.answers);
    }


   
    return Questions;
};