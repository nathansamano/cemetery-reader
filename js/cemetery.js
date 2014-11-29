cem_form = function() {
$('.cem-shell-main-content').alpaca({

    // These files will pre-load form with data BUT
    // here it is done with Alpaca's widget data pre-load
    // "schemaSource": "./serialization-schema.json",
    // "dataSource": "./serialization-data.json",

   // This is the only code I had to "write" (copied from Alpaca site)
//   "postRender": function(form) {
//	// Serialize is the submit button element
//        $("#serialize").click(function() {
//        var formData = form.getValue();
//
//	// Send the data to the server via HTML POST
//        $.ajax({
//            type: "POST",
//            url: "cemetery/create",
//            data: {json:JSON.stringify(formData)},
//	    // Render response from server in alert box
//            success: function(data, msg, xhr) {
//              alert(msg);
//            }
//          });
//	// DEBUG: This is data we sent out
//        // alert(JSON.stringify(formData));
//        });
//    },

    // All of this was generated by Alpaca
    "schema": {
        "type": "object",
        "required": false,
        "properties": {
            "cemeteryName": {
                "type": "string",
                "required": false
            },
            "location": {
                "type": "string",
                "required": false
            },
	    "cemeteryAltNames": {
                "type": "string",
                "required": false
            },
            "ownerType": {
                "required": true,
                "enum": [
                    "US",
                    "State",
                    "City",
                    "Township",
                    "Church",
                    "Private",
                    "Other"
                ]
            },
            "ownerName": {
                "type": "string",
                "required": false
            },
	    "isActive": {
                "type": "boolean",
                "required": false
            },

            "establishedDate": {
                "type": "text",
                "required": false
            },
            "hasRegistry": {
                "type": "boolean",
                "required": false,
		"default" : false
            },
            "hasReading": {
                "type": "boolean",
		"default" : false,
                "required": false
            }
        }
    },
    "options": {
        "focus": false,
        "type": "object",
        "validate": true,
        "disabled": false,
        "showMessages": true,
        "collapsible": true,
        "legendStyle": "button",
         "form":{
            "buttons":{
               "submit": {
                  "click":function(e){
                    var formData = this.getValue();
                    // Send the data to the server via HTML POST
                    $.ajax({
                      type: "POST",
                      url: "cemetery/create",
                      data: {json:JSON.stringify(formData)},
                      // Render response from server in alert box
                      success: function(data, msg, xhr) {
                        alert(JSON.stringify(data));
                      } // success
                     }); // ajax
		   // You would think this would be documented . . . 
		   // this.reset();
                   } // click
                 }, // submit
                "reset": {}
              } // buttons
           }, // form

        "fields": {
            "cemeteryName": {
                "type": "text",
                "label": "Official Name",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
		"helper": "Enter official name",
                "size": 40,
            },
            "location": {
                "label": "Location",
                "type": "text",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40
            },

	    "cemeteryAltNames": {
                "type": "text",
                "label": "Other Names",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
            },
            "isActive": {
                "type": "checkbox",
                "label": "isActive",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "rightLabel": ""
            },
            "ownerType": {
                "type": "select",
                "label": "Ownership",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "emptySelectFirst": false
            },
            "establishedDate": {
                "type": "date",
		"dateFormat": "MM/DD/YYYY",
                "label": "Date Established",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "picker": {
		    "minDate": '01/01/1850',
		    "pickTime": false,
		    "icons": {
			"date": 'glyphicon glyphicon-calendar'
               		 }
		}	
           },
            "hasRegistry": {
                "type": "checkbox",
                "label": "Has official registry",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "rightLabel": ""
            },
            "hasReading": {
                "type": "checkbox",
                "label": "Reading Document Available",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "rightLabel": ""
            },
            "ownerName": {
                "type": "text",
                "label": "Owner Name",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40
            }
        }
    },
    "data": {
	// This is data that is pre-loaded into form
        "ownerType": "Township",
        "establishedDate": "01/01/1888",
        "ownerName": "Barkley Township",
	"cemeteryName": "Smith",
	"cemeteryAltNames": "Surrey, Kenton",
	"location": "SE/SW/SW 4 30N 5W",
	"hasReading": false,
	"hasRegistry": false,
	"isActive": false
    },
    "view": {
        "parent": "bootstrap-edit",
        "layout": {
            "template": './layouts-example1-template.html',
            "bindings": {
                "cemeteryName": "#left",
		"ownerType": "#left",
		"cemeteryAltNames": "#left",
		"ownerName": "#left",
		"isActive": "#left",
		"hasReading": "#left",
		"hasRegistry": "#left",
		"location": "#right",
                "establishedDate": "#right",
            } // bindings
        } // layout
  } // view
});
}
