var bcrypt = require('bcrypt-nodejs');

var candidateDao = module.exports = function (models) {
	this.models = models;
};

// Function to hash Password
function hashPassword(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Create new Candidate
candidateDao.prototype.create = function(candidate, cb){
    var newCandidate= {
        "email" : candidate.email,
        "password" : hashPassword(candidate.password),
        "firstname" : candidate.firstname,
        "lastname" : candidate.lastname
    }
    this.models.candidates.findOne({
        where : {
            email : candidate.email
        }
    }).then(candidate => {
			if (candidate) cb(Error("Candidate already exists"));
			else {
				this.models.candidates.create(newCandidate)
					.then(createCandidate=> {
						if (!createCandidate) 
							return cb(Error("Candidate not created !"));
						else
							return cb(null,createCandidate)
					})
					.catch(err => cb(err))
			}
		})
		.catch(err => cb(err));
    
};

// Get candidate
candidateDao.prototype.get = function(id,cb){
	this.models.candidates.findByPk(id)
		.then(candidate=>{
			if(!candidate) cb(Error("candidate not found"));
			else cb(null, candidate);
		}).catch(err => cb(err))
};

// Get All candidates
candidateDao.prototype.list = function(cb){
	this.models.candidates.findAll()
		.then(candidates=>{
			if(!candidates) cb(Error("There is no candidates"));
			else cb(null, candidates);
		}).catch(err => cb(err))
};

// Delete Candidate
candidateDao.prototype.remove = function(id,cb){
	this.models.candidates.destroy({
		where: {
			id
		}
	}).then(candidate=>{
		if (candidate > 0) return cb(null, candidate)
		else return cb(Error('Candidate is not deleted'));
	})
	.catch(err=>cb(err));
};

// Update existing Candidate
candidateDao.prototype.update = function(id, candidateToUpdate, cb){
	this.models.candidates.findOne({
		where:{
			id
		}
	}).then(candidate => {
		if (!candidate) return cb(Error('Candidate not found'))
		else candidate.update({
				"email": candidateToUpdate.email,
				"about" : candidateToUpdate.about,
				"firstName" : candidateToUpdate.firstName,
				"lastName":candidateToUpdate.lastName,
				"country" : candidateToUpdate.country,
				"industry" : candidateToUpdate.industry,
				"birthday":candidateToUpdate.birthday,
				"address":candidateToUpdate.address,
				"phone":candidateToUpdate.phone,
				"photo":candidateToUpdate.photo,
				"cv":candidateToUpdate.cv,
				"degree": candidateToUpdate.degree,
				where: {
					id: candidate.id
				}
			})
			.then(updatedCandidate => {
				if (!updatedCandidate) return cb(Error('candidate is not updated !'))
				else return cb(null, updatedCandidate);
				
			})
			.catch(err => {
				cb(err)
			})
	})
	.catch(err => {
		cb(err)
	})
};
