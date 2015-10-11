var Mongoose = require('mongoose'),
    Passport = require('passport'),
    User = Mongoose.model('User'),
    Contact = Mongoose.model('Contact'),
    Errors = require('../../config/errors.js'),
    Utils = require('../../config/middlewares/utils.js');


exports.getContacts = function(req, res) {
    
	contacts = Contact.loadByOwnerId(req.profile.id, function(err, contacts) {

		if(err) {
			Utils.sendResponse(res, null, false, err.message);
			return;
		}

		Utils.sendResponse(res, contacts, true, null);
        return;
	});

};

exports.addContact = function(req, res) {

	user = req.profile;
	userIdToAdd = req.body.contactUserId;

	User.loadById(userIdToAdd, function(err, userToAdd) {

		if(err) {
			if( err.name == "CastError" ) {
				err = Errors.errors.CONTACT_USER_NOT_FOUND;
			} else {
				err = Errors.custom(err.message);
			}

			Utils.sendResponse(res, null, false, err);
			return;
		}


        if (!userToAdd) {
            Utils.sendResponse(res, null, false, Errors.errors.CONTACT_USER_NOT_FOUND);
            return;
        }

        contact = new Contact();
        contact.ownerUserId = user.id;
        contact.contactUserId = userToAdd.id;
        contact.firstname = userToAdd.firstname;
        contact.lastname = userToAdd.lastname;
        contact.company = userToAdd.company;
        contact.title = userToAdd.title;
        contact.photo = userToAdd.photo;
        contact.save(function(err) {

            if(err) {
                Utils.sendResponse(res, null, false, Errors.errors.COULD_NOT_SAVE_CONTACT);
                return;
            }

            user.contacts.push(contact);
            user.save();

            Utils.sendResponse(res, contact, true, null);
            return;
        });
        
	});

};

exports.deleteContact = function(req, res) {

	contact = req.contact;
	contact.remove(function(err){

		if(err) {
			Utils.sendResponse(res, null, false, err.message);
			return;
		}

		Utils.sendResponse(res, true, true, null);
		return;		
	});


};

exports.populateContact = function(req, res, next, id)  {

	// TODO change to loadById
	
	Contact.findOne({
            _id: id
        })
        .exec(function(err, contact) {

            if (err) {

                if( err.name == "CastError" ) {
                    err = Errors.errors.CONTACT_NOT_FOUND;
                } else {
                    err = err.message;
                }
                
                Utils.sendResponse(res, null, false, err);
                return;
            }

            if (!contact) {
                Utils.sendResponse(res, null, false, Errors.errors.CONTACT_NOT_FOUND);
                return;
            }
            
            req.contact = contact;
            next();
        });

};