'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "candidates", deps: []
 * createTable "companies", deps: []
 * createTable "skills", deps: []
 * createTable "interviews", deps: [companies]
 * createTable "questions", deps: [interviews]
 * createTable "CandidateSkills", deps: [skills, candidates]
 * createTable "documents", deps: [companies]
 * createTable "experiences", deps: [candidates, companies]
 * createTable "applications", deps: [interviews, candidates]
 * createTable "InterviewSkills", deps: [skills, interviews]
 * createTable "message_notifications", deps: [candidates, companies]
 * createTable "messages", deps: [candidates, companies]
 * createTable "notifications", deps: [candidates, companies]
 * createTable "photos", deps: [companies]
 * createTable "answers", deps: [applications, questions]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2021-04-19T17:34:40.377Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "candidates",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "firstname": {
                        "type": Sequelize.STRING,
                        "field": "firstname",
                        "allowNull": true
                    },
                    "lastname": {
                        "type": Sequelize.STRING,
                        "field": "lastname",
                        "allowNull": true
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "allowNull": true
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": true
                    },
                    "about": {
                        "type": Sequelize.STRING(2000),
                        "field": "about",
                        "allowNull": true
                    },
                    "country": {
                        "type": Sequelize.STRING,
                        "field": "country",
                        "allowNull": true
                    },
                    "degree": {
                        "type": Sequelize.STRING,
                        "field": "degree",
                        "allowNull": true
                    },
                    "industry": {
                        "type": Sequelize.STRING,
                        "field": "industry",
                        "allowNull": true
                    },
                    "birthday": {
                        "type": Sequelize.DATE,
                        "field": "birthday",
                        "allowNull": true
                    },
                    "address": {
                        "type": Sequelize.STRING,
                        "field": "address",
                        "allowNull": true
                    },
                    "phone": {
                        "type": Sequelize.STRING,
                        "field": "phone",
                        "allowNull": true
                    },
                    "photo": {
                        "type": Sequelize.STRING,
                        "field": "photo",
                        "allowNull": true
                    },
                    "cv": {
                        "type": Sequelize.STRING,
                        "field": "cv",
                        "allowNull": true
                    },
                    "role": {
                        "type": Sequelize.STRING,
                        "field": "role",
                        "required": true,
                        "enum": ["admin", "member"]
                    },
                    "playerId": {
                        "type": Sequelize.STRING,
                        "field": "playerId",
                        "allowNull": true
                    },
                    "oneSignalId": {
                        "type": Sequelize.STRING,
                        "field": "oneSignalId",
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
                "companies",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": true
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "allowNull": true
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": true
                    },
                    "about": {
                        "type": Sequelize.STRING(2000),
                        "field": "about",
                        "allowNull": true
                    },
                    "sector": {
                        "type": Sequelize.STRING,
                        "field": "sector",
                        "allowNull": true
                    },
                    "phone": {
                        "type": Sequelize.STRING,
                        "field": "phone",
                        "allowNull": true
                    },
                    "website": {
                        "type": Sequelize.STRING,
                        "field": "website",
                        "allowNull": true
                    },
                    "logo": {
                        "type": Sequelize.STRING,
                        "field": "logo",
                        "allowNull": true
                    },
                    "cover": {
                        "type": Sequelize.STRING,
                        "field": "cover",
                        "allowNull": true
                    },
                    "country": {
                        "type": Sequelize.STRING,
                        "field": "country",
                        "allowNull": true
                    },
                    "state": {
                        "type": Sequelize.STRING,
                        "field": "state",
                        "allowNull": true
                    },
                    "city": {
                        "type": Sequelize.STRING,
                        "field": "city",
                        "allowNull": true
                    },
                    "street": {
                        "type": Sequelize.STRING,
                        "field": "street",
                        "allowNull": true
                    },
                    "postal_code": {
                        "type": Sequelize.INTEGER,
                        "field": "postal_code",
                        "allowNull": true
                    },
                    "verified": {
                        "type": Sequelize.BOOLEAN,
                        "field": "verified",
                        "allowNull": true
                    },
                    "document": {
                        "type": Sequelize.STRING,
                        "field": "document",
                        "allowNull": true
                    },
                    "playerId": {
                        "type": Sequelize.STRING,
                        "field": "playerId",
                        "allowNull": true
                    },
                    "oneSignalId": {
                        "type": Sequelize.STRING,
                        "field": "oneSignalId",
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
                "skills",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "skill": {
                        "type": Sequelize.STRING,
                        "field": "skill",
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
                "interviews",
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
                    "accepted_degree": {
                        "type": Sequelize.STRING,
                        "field": "accepted_degree",
                        "allowNull": true
                    },
                    "experience_years": {
                        "type": Sequelize.INTEGER,
                        "field": "experience_years",
                        "allowNull": true
                    },
                    "about": {
                        "type": Sequelize.STRING(2000),
                        "field": "about",
                        "allowNull": true
                    },
                    "sector": {
                        "type": Sequelize.STRING,
                        "field": "sector",
                        "allowNull": true
                    },
                    "photo": {
                        "type": Sequelize.STRING,
                        "field": "photo",
                        "allowNull": true
                    },
                    "type": {
                        "type": Sequelize.STRING,
                        "field": "type",
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
                    "companyId": {
                        "type": Sequelize.INTEGER,
                        "field": "companyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "companies",
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
                "questions",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "text_question": {
                        "type": Sequelize.STRING,
                        "field": "text_question",
                        "allowNull": true
                    },
                    "audio_question": {
                        "type": Sequelize.STRING,
                        "field": "audio_question",
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
                    "interviewId": {
                        "type": Sequelize.INTEGER,
                        "field": "interviewId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "interviews",
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
                "CandidateSkills",
                {
                    "skillId": {
                        "type": Sequelize.INTEGER,
                        "unique": "CandidateSkills_skillId_candidateId_unique",
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
                        "unique": "CandidateSkills_skillId_candidateId_unique",
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
        },
        {
            fn: "createTable",
            params: [
                "documents",
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
                    "document": {
                        "type": Sequelize.STRING,
                        "field": "document",
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
                    "companyId": {
                        "type": Sequelize.INTEGER,
                        "field": "companyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "companies",
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
                "experiences",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "sector": {
                        "type": Sequelize.STRING,
                        "field": "sector",
                        "allowNull": true
                    },
                    "companyName": {
                        "type": Sequelize.STRING,
                        "field": "companyName",
                        "allowNull": true
                    },
                    "startingDate": {
                        "type": Sequelize.DATE,
                        "field": "startingDate",
                        "allowNull": true
                    },
                    "endingDate": {
                        "type": Sequelize.DATE,
                        "field": "endingDate",
                        "allowNull": true
                    },
                    "description": {
                        "type": Sequelize.STRING(1000),
                        "field": "description",
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
                    },
                    "companyId": {
                        "type": Sequelize.INTEGER,
                        "field": "companyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "companies",
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
                "applications",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "status": {
                        "type": Sequelize.STRING,
                        "field": "status",
                        "allowNull": true,
                        "enum": ["Pending", "Accepted", "Rejected"]
                    },
                    "explanation": {
                        "type": Sequelize.STRING,
                        "field": "explanation",
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
                    "interviewId": {
                        "type": Sequelize.INTEGER,
                        "field": "interviewId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "interviews",
                            "key": "id"
                        },
                        "allowNull": true
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
                "InterviewSkills",
                {
                    "skillId": {
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
                    "interviewId": {
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
        },
        {
            fn: "createTable",
            params: [
                "message_notifications",
                {
                    "id": {
                        "type": Sequelize.STRING(300),
                        "field": "id",
                        "primaryKey": true
                    },
                    "receiver": {
                        "type": Sequelize.STRING(100),
                        "field": "receiver",
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
                    },
                    "companyId": {
                        "type": Sequelize.INTEGER,
                        "field": "companyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "companies",
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
                "messages",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "message": {
                        "type": Sequelize.STRING(950),
                        "field": "message",
                        "allowNull": true
                    },
                    "sender": {
                        "type": Sequelize.STRING(100),
                        "field": "sender",
                        "allowNull": true
                    },
                    "new": {
                        "type": Sequelize.BOOLEAN,
                        "field": "new",
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
                    },
                    "companyId": {
                        "type": Sequelize.INTEGER,
                        "field": "companyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "companies",
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
                "notifications",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "idNot": {
                        "type": Sequelize.STRING(200),
                        "field": "idNot",
                        "allowNull": true
                    },
                    "title": {
                        "type": Sequelize.STRING(300),
                        "field": "title",
                        "allowNull": true
                    },
                    "description": {
                        "type": Sequelize.STRING(2000),
                        "field": "description",
                        "allowNull": true
                    },
                    "photo": {
                        "type": Sequelize.STRING(500),
                        "field": "photo",
                        "allowNull": true
                    },
                    "new": {
                        "type": Sequelize.BOOLEAN,
                        "field": "new",
                        "allowNull": true
                    },
                    "receiver": {
                        "type": Sequelize.STRING(100),
                        "field": "receiver",
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
                    },
                    "companyId": {
                        "type": Sequelize.INTEGER,
                        "field": "companyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "companies",
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
                "photos",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "photo": {
                        "type": Sequelize.STRING,
                        "field": "photo",
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
                    "companyId": {
                        "type": Sequelize.INTEGER,
                        "field": "companyId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "companies",
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
                "answers",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true
                    },
                    "video": {
                        "type": Sequelize.STRING,
                        "field": "video",
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
                    "applicationId": {
                        "type": Sequelize.INTEGER,
                        "field": "applicationId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "applications",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "questionId": {
                        "type": Sequelize.INTEGER,
                        "field": "questionId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "questions",
                            "key": "id"
                        },
                        "allowNull": true
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
            params: ["answers", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["applications", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["CandidateSkills", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["candidates", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["companies", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["documents", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["experiences", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["InterviewSkills", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["interviews", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["message_notifications", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["messages", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["notifications", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["photos", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["questions", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["skills", {
                transaction: transaction
            }]
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
