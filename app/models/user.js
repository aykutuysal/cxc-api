var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    _ = require('underscore'),
    authTypes = ['github', 'twitter', 'facebook', 'google'];

  //////////////////////////////////////////////////////////////////////////////
 /////////   SCHEMA   /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var UserSchema = new Schema({
    photo: String,
    firstname: String,
    lastname: String,
    phone: String,
    email: {
        type: String,
        unique: true
    },
    company: String,
    title: String,
    description: String,
    website: String,
    keywords: [String],
    facebook: String,
    twitter: String,
    google: String,
    linkedin: String,
    provider: String,
    hashed_password: String,
    salt: String,
    contacts : [{
      type: Schema.ObjectId,
      ref: 'Contact'
    }],
    checkins : [{
        type: Schema.ObjectId,
        ref: 'CheckIn'
    }],
    deviceId : String,
    createDate: { 
      type: Date, 
      default: Date.now
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'PASSIVE'],
        default : 'ACTIVE'
    }
});

  //////////////////////////////////////////////////////////////////////////////
 /////////   VIRTUALS   ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

  //////////////////////////////////////////////////////////////////////////////
 /////////   VALIDATIONS   ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var validatePresenceOf = function(value) {
    return value && value.length;
};

UserSchema.path('firstname').validate(function(firstname) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return firstname.length;
}, 'Firstname cannot be blank');

UserSchema.path('lastname').validate(function(lastname) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return lastname.length;
}, 'Lastname cannot be blank');

UserSchema.path('email').validate(function(email) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashed_password.length;
}, 'Password cannot be blank');


  //////////////////////////////////////////////////////////////////////////////
 /////////   PRESAVE   ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

UserSchema.pre('save', function(next) {

    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
        next(new Error('Invalid password'));
    else
        next();
});

  //////////////////////////////////////////////////////////////////////////////
 /////////   METHODS   ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    },


    /**
     * Get indexable document from user object
     */
    getIndexDocument: function() {
      return {
        "userId" : this._id,
        "firstname" : this.firstname,
        "lastname" : this.lastname, 
        "photo" : this.photo,
        "createDate" : new Date().toJSON()
      };
    }

};

  //////////////////////////////////////////////////////////////////////////////
 /////////   STATICS   ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

UserSchema.statics = {
    loadById: function(id, cb) {
      this.findOne({
        _id: id
      })
      .exec(cb);
    },
    loadByIdWithContacts: function(id, cb) {
      this.findOne({
        _id: id
      })
      .populate('contacts')
      .exec(cb);
    },
    loadByIdWithCheckins: function(id, cb) {
      this.findOne({
        _id: id
      })
      .populate('checkins')
      .exec(cb);
    }
};


mongoose.model('User', UserSchema);