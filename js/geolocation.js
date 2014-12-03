geo_form = function(location) {
// console.log('Input data: ' + JSON.stringify(location));
$('.cem-shell-main-content').alpaca({
    // These files will pre-load form with data BUT
    // here it is done with Alpaca's widget data pre-load
    // "schemaSource": "./serialization-schema.json",
    // "dataSource": "./serialization-data.json",
	"data": {
	    "long": JSON.stringify(location[0]),
	    "lat": JSON.stringify(location[1])
	     },
        "schema": {
        "type": "object",
        "required": false,
        "properties": {
            "long": {
                "type": "string",
                "required": false
            },
	    "lat": {
		"type": "string",
		"required": false
		},
            "isBox": {
                "type": "boolean",
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
		    // Convert data to suit GeoJSON format
		    var coordinates = [];
		    coordinates.push(parseFloat(formData['long']));
		    coordinates.push(parseFloat(formData['lat']));
		    // This is MongoDB's indexable GeoJSON object structure
		    // Note we're now ignoring bounding box stuff. . . 
		    var modData = { loc: { type: 'Point', 'coordinates': coordinates }};
                    // Send the data to the server via HTML POST
                    $.ajax({
                      type: "POST",
                      url: "geolocation/create",
                      data: {json:JSON.stringify(modData)},
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
            "isBox": {
                "type": "checkbox",
                "label": "Is a bounding box?",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "rightLabel": ""
            }
        }
    },
});
}
