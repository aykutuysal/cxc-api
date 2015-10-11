var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  //////////////////////////////////////////////////////////////////////////////
 /////////   SCHEMA   /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var ContactSchema = new Schema({
	ownerUserId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
	contactUserId : {
        type: Schema.ObjectId,
        ref: 'User'
    },
    firstname: String,
    lastname: String,
    company: String,
    title: String,
    photo: String,
    notes : [{
        type: Schema.ObjectId,
        ref: 'ContactNote'
    }],
    createDate: { 
        type: Date, 
        default: Date.now
    }
});

  //////////////////////////////////////////////////////////////////////////////
 /////////   VALIDATIONS   ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var validatePresenceOf = function(value) {
    return value && value.length;
};

ContactSchema.path('firstname').validate(function(firstname) {
    return firstname.length;
}, 'Firstname cannot be blank');

ContactSchema.path('lastname').validate(function(lastname) {
    return lastname.length;
}, 'Lastname cannot be blank');

  //////////////////////////////////////////////////////////////////////////////
 /////////   STATICS   ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

ContactSchema.statics = {
    loadById: function(id, cb) {
        this.findOne({
            _id: id
        })
        .exec(cb);
    },
    loadByOwnerId: function(id, cb) {
        this.find({
            ownerUserId: id
        })
        .exec(cb);
    },
    loadByOwnerIdWithNotes: function(id, cb) {
        this.find({
            ownerUserId: id
        })
        .populate("notes")
        .exec(cb);
    }  
};
mongoose.model('Contact', ContactSchema);