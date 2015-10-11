
exports.errors = {
	
	"USER_ALREADY_EXISTS" : {
		"errorCode" : 10001,
		"errorMessage" : "User already exists."
	},
	"USER_NOT_FOUND" : {
		"errorCode" : 10002,
		"errorMessage" : "User not found."
	},
	"CONTACT_NOT_FOUND" : {
		"errorCode" : 10003,
		"errorMessage" : "Contact not found."
	},
	"CONTACT_USER_NOT_FOUND" : {
		"errorCode" : 10004,
		"errorMessage" : "Cannot find user to be added to contacts. Trying to add invalid user id."
	},
	"CAN_NOT_SAVE_CONTACT" : {
		"errorCode" : 10005,
		"errorMessage" : "Cannot save contact information."
	},
	"CONTACT_NOTE_NOT_FOUND" : {
		"errorCode" : 10006,
		"errorMessage" : "Contact note not found."
	},
	"CHECK_IN_NOT_FOUND" : {
		"errorCode" : 10007,
		"errorMessage" : "CheckIn not found."
	},
	"CHECKIN_COULDNT_SAVE_TO_DB" : {
		"errorCode" : 10008,
		"errorMessage" : "CheckIn couldn't be saved to DB."
	},
	"CHECKIN_COULDNT_INDEX" : {
		"errorCode" : 10009,
		"errorMessage" : "CheckIn couldn't be indexed."
	}
};

exports.custom = function(message) {
	return {
		"errorCode" : 10000,
		"errorMessage" : message
	}
};