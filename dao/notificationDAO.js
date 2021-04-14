var notificationDAO = module.exports = function (models) {
    this.models = models;
};


// Send Notification

notificationDAO.prototype.sendNotification = function(notification, cb){
    var newNotification = {
        "idNot": notification.idNot,
        "title": notification.title,
        "description": notification.description,
        "photo": notification.photo,
        "new": true,
        "receiver": notification.receiver,
        "companyId": notification.companyId,
        "candidateId": notification.candidateId
    };  
    this.models.notifications.create(newNotification).then(createdNotification => {
        if (!createdNotification){
            return cb(Error("notification not created !"));
        }
        else{
            return cb(null, createdNotification);
        }
    }).catch(err => cb(err));


};
