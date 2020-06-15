var bcrypt = require('bcrypt-nodejs');
var Op;

var companyDao = module.exports = function (models) {
	this.models = models;
	Op = this.models.Sequelize.Op;
};

// Function to hash Password
function hashPassword(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Create New Company 

companyDao.prototype.create = function(company, cb){
    var newCompany= {
        "email" : company.email,
        "password" : hashPassword(company.password),
        "name" : company.name,
      
    }
    this.models.companies.findOne({
        where : {
            email : company.email
        }
    }).then(company => {
			if (company) cb(Error("company already exists"));
			else {
				this.models.companies.create(newCompany)
					.then(createdCompany => {
						if (!createdCompany) 
							return cb(Error("company not created !"));
						else
							return cb(null,createdCompany);
					})
					.catch(err => cb(err))
			}
	}).catch(err => cb(err));
    
};

// Update existing company
companyDao.prototype.update = function(id,	companyToUpdate, cb){
	this.models.companies.findOne({
		where:{
			id
		}
	}).then(company => {
		if (!company) return cb(Error('Company not found'))
		else company.update({
				"email": companyToUpdate.email,
				"name" : companyToUpdate.name,
				"about" : companyToUpdate.about,
				"sector" : companyToUpdate.sector,
				"phone":companyToUpdate.phone,
				"website" : companyToUpdate.website,
				"founded" : companyToUpdate.founded,
				"linkedin" : companyToUpdate.linkedin,
				"size":companyToUpdate.size,
				"logo":companyToUpdate.logo,
				"cover":companyToUpdate.cover,
				"country":companyToUpdate.country,
				"state":companyToUpdate.state,
				"city":companyToUpdate.city,
                "street":companyToUpdate.street,
                "postal_code":companyToUpdate.postal_code,
                "longitude":companyToUpdate.longitude,
                "latitude":companyToUpdate.latitude,
                "verified":companyToUpdate.verified,
				where: {
					id: company.id
				}
			})
			.then(updatedCompany => {
				if (!updatedCompany) return cb(Error('Company is not updated !'))
				else return cb(null, updatedCompany);
				
			})
			.catch(err => {
				cb(err)
			})
	})
	.catch(err => {
		cb(err)
	})
};

// Remove Company
companyDao.prototype.remove = function(id,cb){
	this.models.companies.destroy({
		where: {
			id
		}
	}).then(company=>{
		if (company > 0) return cb(null, company)
		else return cb(Error('Company is not deleted'));
	})
	.catch(err=>cb(err));
};

