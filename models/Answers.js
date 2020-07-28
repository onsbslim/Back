'use strict'

module.exports = function (sequelize, DataTypes) {
    var Answers = sequelize.define('answers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        
    });

    Answers.associate = (models) => {
        models.answers.belongsTo(models.applications);
        models.answers.belongsTo(models.questions);
    }

    return Answers;
};