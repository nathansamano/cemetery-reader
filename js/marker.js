marker_form = function() {
$('.cem-shell-marker-content').alpaca({
    "schema": {
        "type": "object",
        "required": false,
        "properties": {
            "cemetery_id": {
                "type": "string",
                "required": false
            },
            "geopoint_id": {
                "type": "string",
                "required": false
            },
	    "location": {
                "type": "string",
                "required": false
            },
            "person_id": {
                "type": "string",
                "required": false
            },
            "inscription": {
                "type": "string",
                "required": false
            },
            "isMultipleBurial": {
                "type": "boolean",
                "required": false
            },
            "isMultipleMarker": {
                "type": "boolean",
                "required": false
            },
            "condition": {
                "required": true,
		"enum": [
		"Good",
		"Renovated",
		"Excellent",
		"Fair",
		"Poor",
		"Very Poor"
		]
            },
            "condition_comment": {
                "type": "string",
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
                      url: "marker/create",
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
            "cemetery_id": {
                "type": "text",
                "label": "Cemetery",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "data": {},
                "attributes": {}
            },
            "geopoint_id": {
                "type": "text",
                "label": "Geolocation",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "data": {},
                "attributes": {}
            },
	    "location": {
                "type": "text",
                "label": "Location",
		"helper": "E.g. W Sec, Row 4, Pos 3",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "data": {},
                "attributes": {}
            },
	    "person_id": {
                "type": "text",
                "label": "Person",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "data": {},
                "attributes": {}
            },

            "inscription": {
                "type": "textarea",
                "label": "Marker Inscription",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "data": {},
                "attributes": {},
                "rows": 5,
                "cols": 40
            },
            "isMultipleBurial": {
                "type": "checkbox",
                "label": "Multiple Burial",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "rightLabel": ""
            },
            "isMultipleMarker": {
                "type": "checkbox",
		"label": "Multiple Markers",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "rightLabel": ""
            },
            "condition": {
                "type": "select",
                "label": "Rate Condition",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "emptySelectFirst": false,
            },
	    "condition_comment": {
                "type": "text",
                "label": "Comment on Condition",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "data": {},
                "attributes": {}
            }

        }
    },
    "data": {
        "isMultipleBurial": false,
        "isMultipleMarker": false
    }
  });
}
