geo_form = function(location,url,caption,etype) {

// What if the user comes here first?
if (typeof(location) == 'undefined') {
  // Not 100% sure on this etype thing . . 
  location = [0,0];
  etype = 'Other';
  }

if (typeof(url) == 'undefined')
  url = '';

if (typeof(caption) == 'undefined')
  caption = '';

if (typeof(etype) == 'undefined')
  etype = 'Other';

$('.cem-shell-main-content').alpaca({
    // These files will pre-load form with data BUT
    // here it is done with Alpaca's widget data pre-load
    // "schemaSource": "./serialization-schema.json",
    // "dataSource": "./serialization-data.json",
	"data": {
	    "long": JSON.stringify(location[0]),
	    "lat": JSON.stringify(location[1]),
	    "url": url,
	    "desc": caption,
	    "entity_class": etype
	     },
	"view": "bootstrap-edit",
        "schema": {
        "type": "object",
        "required": false,
        "properties": {
	     "desc": {
                "type": "string",
                "required": false
            },
            "long": {
                "type": "string",
                "required": false
            },
	    "lat": {
		"type": "string",
		"required": false
		},
	     "entity_class": {
                "required": false,
		"enum": [
		   "Other",
		   "Marker",
		   "Structure",
		   "Site",
		   "Cemetery",
		   "Populated Place"
		   ]
            },
	    "url": {
                "type": "string",
                "required": false,
                "pattern": {},
                "format": "uri"
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
		    // Convert data to suit GeoJSON format
		    var coordinates = [];
		    coordinates.push(parseFloat(formData['long']));
		    coordinates.push(parseFloat(formData['lat']));
		    // This is MongoDB's indexable GeoJSON object structure
		    // Note we're now ignoring bounding box stuff. . . 
		    var modLoc = {  type: 'Point', 'coordinates': coordinates };
		    delete formData['long'];
		    delete formData['lat'];
		    formData['loc'] = modLoc;
                    // Send the data to the server via HTML POST
                    $.ajax({
                      type: "POST",
                      url: "geolocation/create",
                      data: {json:JSON.stringify(formData)},
                      // Render response from server in alert box
                      success: function(data, msg, xhr) {
                        alert(JSON.stringify(data));
                        } // success
                     }); // ajax
	           // this.clear(true);
                   } // click
                 }, // submit
                "reset": {}
              } // buttons
           }, // form

        "fields": {
	    "desc": {
                "type": "text",
                "label": "Description",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "data": {},
                "attributes": {}
            },
            "long": {
                "type": "text",
                "label": "Enter longitude",
		"helper": "Negative = WEST",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40
            },
	    "lat": {
               "type": "text",
               "label": "Enter latitude",
               "helper": "Negative = SOUTH",
               "validate": true,
               "disabled": false,
               "showMessages": true,
               "size": 40
		},
	     "entity_class": {
                "type": "select",
                "label": "Type",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "emptySelectFirst": false,
		"removeDefaultNone": true
            },
	    "url": {
                "type": "url",
                "label": "Location url",
                "validate": false,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "data": {},
                "attributes": {}
            }
        }
    },
});
}
