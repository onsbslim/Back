'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "interviewId" on table "InterviewSkills"
 * changeColumn "skillId" on table "InterviewSkills"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2020-10-05T13:51:26.654Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "changeColumn",
            params: [
                "InterviewSkills",
                "interviewId",
                {
                    "type": Sequelize.INTEGER,
                    "unique": "InterviewSkills_skillId_interviewId_unique",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "primaryKey": true,
                    "field": "interviewId",
                    "references": {
                        "model": "interviews",
                        "key": "id"
                    },
                    "foreignKey": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "InterviewSkills",
                "skillId",
                {
                    "type": Sequelize.INTEGER,
                    "unique": "InterviewSkills_skillId_interviewId_unique",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "primaryKey": true,
                    "field": "skillId",
                    "references": {
                        "model": "skills",
                        "key": "id"
                    },
                    "foreignKey": true
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "changeColumn",
            params: [
                "InterviewSkills",
                "interviewId",
                {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "primaryKey": true,
                    "field": "interviewId",
                    "references": {
                        "model": "interviews",
                        "key": "id"
                    },
                    "foreignKey": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "InterviewSkills",
                "skillId",
                {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "primaryKey": true,
                    "field": "skillId",
                    "references": {
                        "model": "skills",
                        "key": "id"
                    },
                    "foreignKey": true
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
