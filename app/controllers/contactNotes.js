var Mongoose = require('mongoose'),
    Passport = require('passport'),
    User = Mongoose.model('User'),
    Contact = Mongoose.model('Contact'),
    ContactNote = Mongoose.model('ContactNote'),
    Errors = require('../../config/errors.js'),
    Utils = require('../../config/middlewares/utils.js');


exports.getNotes = function(req, res) {
    
	contact = req.contact;
    contact.populate("notes", function(err, contact) {

        if(err) {
            Utils.sendResponse(res, null, false, Errors.errors.CONTACT_NOTE_NOT_FOUND);
            return;
        }

        Utils.sendResponse(res, contact.notes, true, null);
        return;
    });

};


exports.addNote = function(req, res) {
    
    contact = req.contact;
    contactNote = new ContactNote(req.body);
    contactNote.contactId = contact.id;

    contactNote.save(function(err) {

        if(err) {
            Utils.sendResponse(res, null, false, Errors.custom(err.message));
            return;
        }

        contact.notes.push(contactNote);
        contact.save();

        Utils.sendResponse(res, contactNote, true, null);
        return;
    });
};


exports.updateNote = function(req, res) {
    
    existingNote = req.contactNote;

    existingNote.update({ text: req.body.text}, function (err, numberAffected, raw) {
        
        if(err) {
            Utils.sendResponse(res, null, false, Errors.custom(err.message));
            return;
        }

        existingNote.text = req.body.text;
        Utils.sendResponse(res, { numberAffected : numberAffected, contactNote : existingNote}, true, null);
        return;
    });

};


exports.deleteNote = function(req, res) {
    
	contactNote = req.contactNote;
    contactNote.remove(function(err){

        if(err) {
            Utils.sendResponse(res, null, false, err.message);
            return;
        }

        Utils.sendResponse(res, true, true, null);
        return;     
    });

};


exports.populateContactNote = function(req, res, next, id) {
    
    ContactNote.findById(id, function(err, contactNote) {

        if (err) {

            if( err.name == "CastError" ) {
                err = Errors.errors.CONTACT_NOTE_NOT_FOUND;
            } else {
                err = err.message;
            }
            
            Utils.sendResponse(res, null, false, err);
            return;
        }

        if (!contactNote) {
            Utils.sendResponse(res, null, false, Errors.errors.CONTACT_NOTE_NOT_FOUND);
            return;
        }
        
        req.contactNote = contactNote;
        next();
    });


};