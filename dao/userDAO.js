var bcrypt = require('bcrypt-nodejs');
var Op;
var userDao = module.exports = function (models) {
	this.models = models;
	Op = this.models.Sequelize.Op;
};

// Function to hash Password
function hashPassword(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Create new User
userDao.prototype.create = function(user, cb){
    var newUser= {
        "email" : user.email,
        "password" : hashPassword(user.password),
        "firstname" : user.firstname,
        "lastname" : user.lastname
    }
    this.models.users.findOne({
        where : {
            email : user.email
        }
    }).then(user => {
			if (user) cb(Error("User already exists"));
			else {
				this.models.users.create(newUser)
					.then(createdUser => {
						if (!createdUser) 
							return cb(Error("User not created !"));
						else
							return cb(null,createdUser)
					})
					.catch(err => cb(err))
			}
		})
		.catch(err => cb(err));
    
};

// Get User
userDao.prototype.get = function(id,cb){
	this.models.users.findByPk(id)
		.then(user=>{
			if(!user) cb(Error("User not found"));
			else cb(null, user);
		}).catch(err => cb(err))
};

// Get All Users
userDao.prototype.list = function(cb){
	this.models.users.findAll()
		.then(users=>{
			if(!users) cb(Error("There is no users"));
			else cb(null, users);
		}).catch(err => cb(err))
};

// Delete User
userDao.prototype.remove = function(id,cb){
	this.models.users.destroy({
		where: {
			id
		}
	}).then(user=>{
		if (user > 0) return cb(null, user)
		else return cb(Error('User is not deleted'));
	})
	.catch(err=>cb(err));
};

// Update existing User
userDao.prototype.update = function(id,	userToUpdate, cb){
	this.models.users.findOne({
		where:{
			id
		}
	}).then(user => {
		if (!user) return cb(Error('User not found'))
		else user.update({
				"email": userToUpdate.email,
				"headline" : userToUpdate.headline,
				"about" : userToUpdate.about,
				"firstName" : userToUpdate.firstName,
				"lastName":userToUpdate.lastName,
				"country" : userToUpdate.country,
				"location" : userToUpdate.location,
				"industry" : userToUpdate.industry,
				"birthday":userToUpdate.birthday,
				"address":userToUpdate.address,
				"phone":userToUpdate.phone,
				"availability":userToUpdate.availability,
				"photo":userToUpdate.photo,
				"video":userToUpdate.video,
				"cv":userToUpdate.cv,
				where: {
					id: user.id
				}
			})
			.then(updatedUser => {
				if (!updatedUser) return cb(Error('User is not updated !'))
				else return cb(null, updatedUser);
				
			})
			.catch(err => {
				cb(err)
			})
	})
	.catch(err => {
		cb(err)
	})
};
