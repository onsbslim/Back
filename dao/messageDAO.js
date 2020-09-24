var messageDAO = module.exports = function(models){
    this.models = models
};

messageDAO.prototype.addMessageFromCompany = function(message, cb){
    var newMessage = {
        "message" : message.message,
        "candidateId": message.candidateId,
        "companyId": message.companyId,
        "sender": message.sender
    };
    this.models.messages.create(newMessage).then(createdMessage =>{
        if (!createdMessage)
            return cb(Error("Message not created !"));
        else
            return cb(null, createdMessage);
    }).catch(err => cb(err));
};

messageDAO.prototype.getCompanysMessages = function(data, cb){
    this.models.messages.findAll({
        where: {
            "companyId": data.companyId,
            "candidateId": data.candidateId
        },
        order: [ ['createdAt', 'ASC'] ],
        include: [this.models.candidates, this.models.companies]
    }).then(messages => {
        if (!messages) cb(Error('There is no message found'));
		else cb(null, messages);
    }).catch(err => cb(err));
};

messageDAO.prototype.getCandidatesDiscussions = function(candidateId, cb){
    this.models.messages.findAll({
        where:{
            "candidateId": candidateId
        }, 
        group: ['companyId'],
        order:[ ['createdAt', 'ASC'] ],
        include: [this.models.companies]
    }).then(messages => {
        if(!messages) cb (Error('No message Found'));
        else cb(null, messages);
    }).catch(err => cb(err));
};