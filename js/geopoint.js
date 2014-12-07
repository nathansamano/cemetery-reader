geo_form = function(form_data,etype) {

// What if the user comes here before opening an image?
  var long, lat, url, caption, entity_type, regex = /(<([^>]+)>)/ig;
  
  if ( typeof(form_data['coordinates']) == 'undefined') {
    long = 0; lat = 0; url = ''; desc = ''; entity_type = 'Other';
    } 
  else {
    long = JSON.stringify(form_data['coordinates'][0]);
    lat = JSON.stringify(form_data['coordinates'][1]);
    url = form_data['imageurl'];
    caption = form_data['caption'].replace(regex," ");
    entity_type = etype;
    } 

if (typeof(etype) == 'undefined')
  entity_type = 'Other';

$('.cem-shell-geo-content').alpaca({
    // These files will pre-load form with data BUT
    // here it is done with Alpaca's widget data pre-load
    // "schemaSource": "./serialization-schema.json",
    // "dataSource": "./serialization-data.json",
	"data": {
	    "long": long,
	    "lat": lat,
	    "url": url,
	    "desc": caption,
	    "entity_class": entity_type
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
                      url: "geopoint/create",
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
                "label": "Document url",
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
