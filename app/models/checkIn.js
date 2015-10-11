var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


  //////////////////////////////////////////////////////////////////////////////
 /////////   SCHEMA   /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var CheckInSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    indexId: String,
    location: [],
    createDate: { 
        type: Date, 
        default: Date.now
    }
});


  //////////////////////////////////////////////////////////////////////////////
 /////////   INDEXES   ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

CheckInSchema.index({ location: '2d' });


  //////////////////////////////////////////////////////////////////////////////
 /////////   STATICS   ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

CheckInSchema.statics = {
    loadById: function(id, cb) {
        this.findOne({
            _id: id
        })
        .exec(cb);
    },
};


mongoose.model('CheckIn', CheckInSchema);