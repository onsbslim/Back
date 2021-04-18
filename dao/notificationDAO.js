var notificationDAO = module.exports = function (models) {
    this.models = models;
};


// Send Notification

notificationDAO.prototype.sendNotification = function (notification, cb) {
    var newNotification = {
        "title": notification.title,
        "description": notification.description,
        "new": true,
        "receiver": notification.receiver,
        "companyId": notification.companyId,
        "candidateId": notification.candidateId
    };
    this.models.notifications.create(newNotification).then(createdNotification => {
        if (!createdNotification) {
            return cb(Error("notification not created !"));
        }
        else {
            return cb(null, createdNotification);
        }
    }).catch(err => cb(err));
};

notificationDAO.prototype.updateNotification = function (id, notificationToUpdate, cb) {
    this.models.notifications.findByPk(id)
        .then(notification => {
            if (!notification) return cb(Error('Notification not found'));
            else notification.update({
                "idNot" : notificationToUpdate.idNot,
                where: {
					id: notification.id,
				}
            }).then(updatedNotification => {
                if (!updatedNotification) return cb(Error('Notification is not updated !'))
				else return cb(null, updatedNotification);
            }).catch(err => {
                cb(err);
            });
        }).catch(err => {
            cb(err);
            console.log(err);
        });
};