var async = require('async');

module.exports = function(app, passport, auth) {

      //////////////////////////////////////////////////////////////////////////////
     /////////   INDEX ROUTES   ///////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
  
    var index = require('../app/controllers/index');
    app.get('/', index.render);


      //////////////////////////////////////////////////////////////////////////////
     /////////   USER ROUTES   ////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    
    var users = require('../app/controllers/users');

    app.get('/api/signin', users.signin);
    
    app.get('/api/signout', users.signout);

    app.post('/api/users', users.create);

    app.put('/api/users', users.update);
    
    app.get('/api/users/me', users.me);
    
    app.get('/api/users/:userId', users.getUser);

    app.param('userId', users.populateProfile);


      //////////////////////////////////////////////////////////////////////////////
     /////////   CONTACT ROUTES   /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    var contacts = require('../app/controllers/contacts');

    app.get('/api/users/:userId/contacts', contacts.getContacts);
    
    app.post('/api/users/:userId/contacts', contacts.addContact);
    
    app.delete('/api/users/:userId/contacts/:contactId', contacts.deleteContact);

    app.param('contactId', contacts.populateContact);


      //////////////////////////////////////////////////////////////////////////////
     /////////   CONTACT NOTE ROUTES   ////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    var contactNotes = require('../app/controllers/contactNotes');
    
    app.get('/api/contacts/:contactId/notes', contactNotes.getNotes);
   
    app.post('/api/contacts/:contactId/notes', contactNotes.addNote);
    
    app.put('/api/contacts/:contactId/notes/:noteId', contactNotes.updateNote);
    
    app.delete('/api/contacts/:contactId/notes/:noteId', contactNotes.deleteNote)

    app.param('noteId', contactNotes.populateContactNote);

      //////////////////////////////////////////////////////////////////////////////
     /////////   CHECK IN ROUTES   ////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    var checkIns = require('../app/controllers/checkIns');

    app.get('/api/users/:userId/checkIns', checkIns.getUserCheckIns);

    app.post('/api/users/:userId/checkIns', checkIns.checkIn);

    app.post('/api/users/:userId/checkIns/:indexId/finish', checkIns.finishCheckIn);

    app.param('indexId', checkIns.populateIndexId);

      //////////////////////////////////////////////////////////////////////////////
     /////////   LOCATION ROUTES   ////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    var locations = require('../app/controllers/locations');

    app.post('/api/locations/usersNearby', locations.getUsersNearby);

};