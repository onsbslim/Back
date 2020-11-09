var Op;
var sequelize;

var messageDAO = module.exports = function (models) {
    this.models = models;
    Op = this.models.Sequelize.Op;
    sequelize = this.models.Sequelize;
};

messageDAO.prototype.addMessage = function (message, cb) {
    var newMessage = {
        "message": message.message,
        "candidateId": message.candidateId,
        "companyId": message.companyId,
        "sender": message.sender,
        "new": true
    };
    this.models.messages.create(newMessage).then(createdMessage => {
        if (!createdMessage)
            return cb(Error("Message not created !"));
        else
            return cb(null, createdMessage);
    }).catch(err => cb(err));
};

messageDAO.prototype.getCompanysMessages = function (data, cb) {
    this.models.messages.findAll({
        where: {
            "companyId": data.companyId,
            "candidateId": data.candidateId
        },
        order: [['createdAt', 'ASC']],
        include: [this.models.candidates, this.models.companies]
    }).then(messages => {
        if (!messages) cb(Error('There is no message found'));
        else cb(null, messages);
    }).catch(err => cb(err));
};

messageDAO.prototype.getCandidatesDiscussions = function (candidateId, cb) {
    this.models.messages.findAll({
        attributes: [[sequelize.fn("max", sequelize.col('id')), 'id']],
        where: {
            candidateId: candidateId
        },
        group: ["companyId"],
    }).then(maxIds => {
        var ids = [];
        for (var i = 0; i < maxIds.length; i++) {
            ids[i] = maxIds[i].dataValues.id;
        }

        this.models.messages.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            },
            include: [this.models.companies]
        }).then(messages => {
            if (!messages) cb(Error('No message Found'));
            else cb(null, messages);
        }).catch(err => cb(err));
    }).catch(err => cb(err));




};

messageDAO.prototype.getCompanyDiscussions = function (idCompany, cb) {
    this.models.messages.findAll({
        attributes: [[sequelize.fn("max", sequelize.col('id')), 'id']],
        where: {
            companyId: idCompany
        }
    }).then(maxIds => {
        var ids = [];
        for (var i = 0; i < maxIds.length; i++) {
            ids[i] = maxIds[i].dataValues.id;
        }

        this.models.messages.findAll({
            where: {
                id: {
                    [Op.in]: ids
                }
            },
            include: [this.models.candidates]
        }).then(messages => {
            if(!messages) cb(Error('No message found'));
            else cb(null, messages);
        }).catch(err => cb(err));
    }).catch(err => cb(err));
};

messageDAO.prototype.updateMessage = function (candidateId, companyId, sender, cb) {
    this.models.messages.findAll({
        where: {
            "candidateId": candidateId,
            "companyId": companyId,
            "sender": sender
        }
    }).then(messages => {
        if (!messages) cb(Error('Messages Not found'));
        else this.models.messages.update(
            {
                "new": false
            }, {
            where: {
                candidateId: candidateId,
                companyId: companyId,
                sender: sender,
            },
        }
        )
            .then(updatedMessages => {
                if (!updatedMessages) cb(Error('Messages Not Updated'));
                else cb(null, messages);
            }).catch(err => cb(err));
    }).catch(err => cb(err));
};