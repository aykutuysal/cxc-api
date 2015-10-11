Contact XC API
===============================================================================

This is the API project for contact exchange application.





GENERAL NOTES
===============================================================================

-	Each response returned from the api meets the generic response structure.
-	If a request is processed successfully, success field is set to true and the response object is returned in data field.
-	If an error occures, success field is set to false and errors field is used for returning the error details


GENERIC RESPONSE OBJECT
-------------------------------------------------------------------------------
	{
	    "success": true | false,
	    "data": {},
	    "errors": {
	        "errorCode": Number,
	        "errorMessage": String
	    }
	}



ERROR CODES
===============================================================================

	ERROR NAME 										VALUE
	--------------------------------				------
	CUSTOM_ERROR									10000
	USER_ALREADY_EXISTS								10001
	USER_NOT_FOUND									10002
	CONTACT_NOT_FOUND								10003
	CONTACT_USER_NOT_FOUND							10004
	CAN_NOT_SAVE_CONTACT							10005
	CONTACT_NOTE_NOT_FOUND							10006
	CHECK_IN_NOT_FOUND								10007
	CHECKIN_COULDNT_SAVE_TO_DB						10008
	CHECKIN_COULDNT_INDEX							10009



METHODS
===============================================================================



CREATE USER PROFILE
-------------------------------------------------------------------------------

    URL (POST)
    	/users

    REQUEST
		{
		  "photo" : "",
		  "firstname" : "Aykut",
		  "lastname" : "Uysal",
		  "phone" : "+90123123123",
		  "email" : "aykutuysal@gmail.com",
		  "company" : "sahibinden.com",
		  "title" : "Software Engineer",
		  "description" : "Ah o cazlar bluzlar mahvediyor beni",
		  "website" : "", 
		  "keywords" : ["nodejs", "scala"],
		  "facebook" : "",
		  "twitter" : "",
		  "google" : "",
		  "linkedin" : "",
		  "deviceId" : "asdjsaj23141kaskdaks59459akasd",
		  "password" : "753951"
		}

    RESPONSE
        {
	        "__v": 0,
	        "provider": "local",
	        "photo": "https://knockingelephant.files.wordpress.com/2012/06/elephant-shit.jpeg",
	        "firstname": "Kutadgu",
	        "lastname": "Bilig",
	        "phone": "+90123123123",
	        "email": "biliSg@gmail.com",
	        "company": "Bilge",
	        "title": "Biiigggg",
	        "deviceId": "asdjsaj23141kaskdaks59459akasd",
	        "hashed_password": "b505cdc1b432e69476d49ff100d69fa886e986bf",
	        "salt": "1073563970321",
	        "_id": "527a296e133a080000000003",
	        "status": "ACTIVE",
	        "contacts": [],
	        "keywords": [
	            "kutadgu",
	            "bilig"
	        ]
	    }
	    



GET USER
-------------------------------------------------------------------------------

	URL (GET)
		/users/:userId

	RESPONSE
		{
	        "__v": 3,
	        "_id": "52782336942f4a36cd000001",
	        "company": "sahibinden.com",
	        "deviceId": "asdas12dsadasd12easda",
	        "email": "aykutuysal@gmail.com",
	        "firstname": "Aykut",
	        "hashed_password": "3881baa4379499fd103017afdfbe33c8dfe30658",
	        "lastname": "Uysal",
	        "phone": "+905054795629",
	        "photo": "https://knockingelephant.files.wordpress.com/2012/06/elephant-shit.jpeg",
	        "provider": "local",
	        "salt": "763526104230",
	        "title": "Software Engineer",
	        "status": "ACTIVE",
	        "contacts": [
	            "527825d75e77ee57d7000001",
	            "5278285c70abe7a4dc000002",
	            "5278302eb8280e44f2000001"
	        ],
	        "keywords": [
	            "big data",
	            "java",
	            "scala",
	            "node.js"
	        ]
	    }


GET MY PROFILE INFO
-------------------------------------------------------------------------------

	URL (GET)
		/users/me

	RESPONSE
		{
	        "__v": 3,
	        "_id": "52782336942f4a36cd000001",
	        "company": "sahibinden.com",
	        "deviceId": "asdas12dsadasd12easda",
	        "email": "aykutuysal@gmail.com",
	        "firstname": "Aykut",
	        "hashed_password": "3881baa4379499fd103017afdfbe33c8dfe30658",
	        "lastname": "Uysal",
	        "phone": "+905054795629",
	        "photo": "https://knockingelephant.files.wordpress.com/2012/06/elephant-shit.jpeg",
	        "provider": "local",
	        "salt": "763526104230",
	        "title": "Software Engineer",
	        "status": "ACTIVE",
	        "contacts": [
	            "527825d75e77ee57d7000001",
	            "5278285c70abe7a4dc000002",
	            "5278302eb8280e44f2000001"
	        ],
	        "keywords": [
	            "darbukaci",
	            "java",
	            "scala",
	            "node.js",
	            "big data"
	        ]
	    }


SIGN OUT
-------------------------------------------------------------------------------

	URL (GET)
		/signout

	RESPONSE
		{}



GET CONTACTS
-------------------------------------------------------------------------------

	URL (GET)
		/users/:userId/contacts

	RESPONSE
		[
	        {
	            "__v": 2,
	            "_id": "527825d75e77ee57d7000001",
	            "company": "Kendi işim",
	            "contactUserId": "5278245def11ea0bd1000001",
	            "firstname": "Mahmut",
	            "lastname": "Tuncer",
	            "ownerUserId": "52782336942f4a36cd000001",
	            "photo": "https://knockingelephant.files.wordpress.com/2012/06/elephant-shit.jpeg",
	            "title": "Sanatçı",
	            "notes": [
	                "5278a06417bc1a0000000001",
	                "527914ca2d04ac9a27000001"
	            ]
	        },
	        {
	            "__v": 2,
	            "_id": "527825d75e77ee57d7000001",
	            "company": "Kendi işim",
	            "contactUserId": "5278245def11ea0bd1000001",
	            "firstname": "Mahmut",
	            "lastname": "Tuncer",
	            "ownerUserId": "52782336942f4a36cd000001",
	            "photo": "https://knockingelephant.files.wordpress.com/2012/06/elephant-shit.jpeg",
	            "title": "Sanatçı",
	            "notes": [
	                "5278a06417bc1a0000000001",
	                "527914ca2d04ac9a27000001"
	            ]
	        }
	    ]



ADD CONTACT
-------------------------------------------------------------------------------

	URL (POST)
		/users/:userId/contacts

	REQUEST
		{
			"contactUserId" : "5278245def11ea0bd1000001"
		}

	RESPONSE
		{
	        "__v": 0,
	        "photo": "https://knockingelephant.files.wordpress.com/2012/06/elephant-shit.jpeg",
	        "title": "Sanatçı",
	        "company": "Kendi işim",
	        "lastname": "Tuncer",
	        "firstname": "Mahmut",
	        "contactUserId": "5278245def11ea0bd1000001",
	        "ownerUserId": "52782336942f4a36cd000001",
	        "_id": "527a2546133a080000000001",
	        "notes": []
	    }



DELETE CONTACT
-------------------------------------------------------------------------------

	URL (DELETE)
		/users/:userId/contacts/:contactId

	RESPONSE
		true | false



GET CONTACT NOTES
-------------------------------------------------------------------------------

	URL (GET)
		/contacts/:contactId/notes

	RESPONSE
		[
	        {
	            "__v": 0,
	            "_id": "5278a06417bc1a0000000001",
	            "contactId": "527825d75e77ee57d7000001",
	            "text": "adamin krali midir kiiasssa",
	            "createDate": "2013-11-05T07:38:08.628Z"
	        },
	        {
	            "contactId": "527825d75e77ee57d7000001",
	            "text": "adamin kralidir",
	            "_id": "527a268c133a080000000002",
	            "__v": 0,
	            "createDate": "2013-11-06T11:15:47.249Z"
	        }
	    ]



ADD CONTACT NOTE
-------------------------------------------------------------------------------

	URL (POST)
		/contacts/:contactId/notes

	REQUEST
		{
		  "text" : "adamin kralidir"
		}

	RESPONSE
		{
		    "__v": 0,
		    "contactId": "527825d75e77ee57d7000001",
		    "text": "adamin kralidir",
		    "_id": "527a268c133a080000000002",
		    "createDate": "2013-11-06T11:15:47.249Z"
		}



UPDATE CONTACT NOTE
-------------------------------------------------------------------------------

	URL (PUT)
		/contacts/:contactId/notes/:noteId

	REQUEST
		{
		  "text" : "adamin kralidir"
		}

	RESPONSE
		{
		    "__v": 0,
		    "contactId": "527825d75e77ee57d7000001",
		    "text": "adamin kralidir",
		    "_id": "527a268c133a080000000002",
		    "createDate": "2013-11-06T11:15:47.249Z"
		}


DELETE CONTACT NOTE
-------------------------------------------------------------------------------

	URL (DELETE)
		/contacts/:contactId/notes/:noteId

	RESPONSE
		true | false


CHECK IN
-------------------------------------------------------------------------------

	URL (POST)
		/users/:userId/checkIns

	REQUEST
		{
			"location" : [41.111256, 29.029999]  # [latitude, longitude]
		}

	RESPONSE
		{
	        "__v": 0,
	        "indexId": "vgRAkgoCQf-MexXX1mdcmw",
	        "userId": "52782336942f4a36cd000001",
	        "_id": "528dcfba411e185771000001",
	        "createDate": "2013-11-21T09:17:46.594Z",
	        "location": [
	            41.111256,
	            29.029999
	        ]
	    }


FINISH CHECK IN
-------------------------------------------------------------------------------

	URL (POST)
		/users/:userId/checkIns/:indexId/finish

	RESPONSE
		true | false


GET USERS NEARBY
-------------------------------------------------------------------------------

	URL (POST)
		/locations/usersNearby

	REQUEST
		{
			"location" : [41.111256, 29.029999]
		}

	RESPONSE
		{
			"success": true,
			"data": {
				"total": 2,
				"users": [
					{
						"indexId": "nCdn1VubTgKcH_grDnFDTw",
						"userId": "52782336942f4a36cd000001",
						"firstname": "Aykut",
						"lastname": "Uysal",
						"photo": "https://knockingelephant.files.wordpress.com/2012/06/elephant-shit.jpeg",
						"createDate": "2013-11-21T16:08:30.800Z",
						"location": {
							"lat": 41.111256,
							"lon": 29.029999
						}
					},
					{
						"indexId": "bifthgZAQX-PbzRsWC5etQ",
						"userId": "52782336942f4a36cd000001",
						"firstname": "Aykut",
						"lastname": "Uysal",
						"photo": "https://knockingelephant.files.wordpress.com/2012/06/elephant-shit.jpeg",
						"createDate": "2013-11-21T16:17:05.972Z",
						"location": {
							"lat": 41.111256,
							"lon": 29.029999
						}
					}
				]
			},
			"errors": null
		}