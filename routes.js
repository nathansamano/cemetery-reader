/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  configRoutes,
  mongodb     = require( 'mongodb' ),

  mongoServer = new mongodb.Server(
    'localhost',
    mongodb.Connection.DEFAULT_PORT
  ),
  dbHandle    = new mongodb.Db(
    'cemdb', mongoServer, { safe : true }
  ),

  makeMongoId = mongodb.ObjectID;
// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN PUBLIC METHODS ------------------

// This probably doesn't belong here, but for now . . . 
var booleans = { "cemetery": { "hasReading": false, "hasRegistry": false, "isActive": false } },
key_name, 
check_map,
id;

configRoutes = function ( app, server ) {
  app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );
    next();
  });

  app.post( '/:obj_type/create', function ( request, response ) {

    // Get next ID for appropriate collection from sequence
    var dbName = request.params.obj_type;
    dbHandle.collection(
        'counters',
        function ( outer_error, collection ) {
        var
          sort_order = [],
          options_map = {
            'new' : true, safe: true, fsync: true
          };
        collection.findAndModify(
            { _id: dbName },
            [[ '_id',1]],
            { $inc: { seq: 1 } },
            {new: true, fsync: true},
        function(err, doc){
          console.log('Retval #1: ' + doc.seq);
	  
	  // Embed insertion query because of async op
	  dbHandle.collection(
             request.params.obj_type,
             function ( outer_error, collection ) {
               var
                 options_map = { safe: true },
                 obj_map     = request.body;
       
       	  	 // Insert false values for unsent booleans
       	  	 // Is there a better way of doing this??  Tell me please!!
       	  	 console.log(request.params.obj_type);
       	  	 var inputMap = JSON.parse(obj_map.json);
       	  	 console.log('Input map: ' + inputMap);
       	 	 check_map = booleans[request.params.obj_type];
       	  	 for ( key_name in check_map ) {
       		    if ( !(inputMap.hasOwnProperty( key_name )) ) {
       		       inputMap[key_name] = check_map[key_name];
       		       }
       	  	    };
       	  	 // Flush contents of check_map for next run
       	  	 for (var member in check_map) delete check_map[member];
       
       	  	 // Set primary key (depending on object type)
       	  	 inputMap['_id'] = doc.seq;
       	  	 console.log(inputMap);
       
       	  	 // Write full record to database, including generated key
                 collection.insert(
                   inputMap,
                   options_map,
                   function ( inner_error, result_map ) {
       	             // I think we should return the _id here, if possible
       	             // But ATM I don't know how. . . 
                     response.json(200, 'Inserted new item with id of ' + doc.seq );
                     }
                    ); // end insert
                  } // end outer func
           	 ); // end nested handler

          } // inner func
        ); // findAndModify
       } // outer function
    ); // collection operation

  }); // app.post

  app.post( '/:obj_type/update/:id', function ( request, response ) {
    var
      find_map = { _id: makeMongoId( request.params.id ) },
      obj_map  = request.body;

    dbHandle.collection(
      request.params.obj_type,
      function ( outer_error, collection ) {
        var
          sort_order = [],
          options_map = {
            'new' : true, upsert: false, safe: true
          };

        collection.findAndModify(
          find_map,
          sort_order,
          obj_map,
          options_map,
          function ( inner_error, updated_map ) {
            response.send( updated_map );
          }
        );
      }
    );
  });

  app.get( '/:obj_type/delete/:id', function ( request, response ) {
    var find_map = { _id: makeMongoId( request.params.id ) };

    dbHandle.collection(
      request.params.obj_type,
      function ( outer_error, collection ) {
        var options_map = { safe: true, single: true };

        collection.remove(
          find_map,
          options_map,
          function ( inner_error, delete_count ) {
            response.send({ delete_count: delete_count });
          }
        );
      }
    );
  });
};

module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------

// ------------- BEGIN MODULE INITIALIZATION --------------
dbHandle.open( function () {
  console.log( '** Connected to MongoDB **' );
});
// -------------- END MODULE INITIALIZATION ---------------
