'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "CandidateSkill"
 * createTable "CandidateSkills", deps: [skills, candidates]
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2020-09-01T16:01:06.673Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["CandidateSkill", {
                transaction: transaction
            }]
        },
        {
            fn: "createTable",
            params: [
                "CandidateSkills",
                {
                    "skillId": {
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
                    "candidateId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "primaryKey": true,
                        "field": "candidateId",
                        "references": {
                            "model": "candidates",
                            "key": "id"
                        },
                        "foreignKey": true
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
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["CandidateSkills", {
                transaction: transaction
            }]
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
