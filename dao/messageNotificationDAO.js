var messageNotificationDAO = module.exports = function (models) {
    this.models = models;
};

messageNotificationDAO.prototype.createNotification = function(notification, cb){
    var newNotification = {
        "id": notification.id,
        "companyId": notification.companyId,
        "candidateId": notification.candidateId ,
        "receiver": notification.receiver
    };
    
    this.models.message_notifications.create(newNotification).then(createdNotification => {

        if (!createdNotification)
            return cb(Error("notification not created !"));
        else
            return cb(null, createdNotification);
    }).catch(err => cb(err));
};

messageNotificationDAO.prototype.getNotification = function(id, cb) {
    console.log("In here");
    this.models.message_notifications.findOne({
        where: {
            id: id
        },
    }).then(messageNotification => {
        if (!messageNotification) cb(Error("Notification not found"));
        else cb(null, messageNotification);
    }).catch(err => cb(err));

};