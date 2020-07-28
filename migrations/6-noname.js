'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "skills"
 * dropTable "InterviewSkill"
 * dropTable "CandidateSkill"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2020-07-23T14:06:26.145Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["skills", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["InterviewSkill", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["CandidateSkill", {
                transaction: transaction
            }]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "skills",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "title": {
                        "type": Sequelize.STRING,
                        "field": "title",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "candidateId": {
                        "type": Sequelize.INTEGER,
                        "field": "candidateId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "candidates",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "InterviewSkill",
                {
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "interviewId": {
                        "type": Sequelize.INTEGER,
                        "field": "interviewId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "interviews",
                            "key": "id"
                        },
                        "primaryKey": true
                    },
                    "skillId": {
                        "type": Sequelize.INTEGER,
                        "field": "skillId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "skills",
                            "key": "id"
                        },
                        "primaryKey": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "CandidateSkill",
                {
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "skillId": {
                        "type": Sequelize.INTEGER,
                        "field": "skillId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "skills",
                            "key": "id"
                        },
                        "primaryKey": true
                    },
                    "candidateId": {
                        "type": Sequelize.INTEGER,
                        "field": "candidateId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "candidates",
                            "key": "id"
                        },
                        "primaryKey": true
                    }
                },
                {
                    "transaction": transaction
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
