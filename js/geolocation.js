geo_form = function() {
$('.cem-shell-main-content').alpaca({

    // These files will pre-load form with data BUT
    // here it is done with Alpaca's widget data pre-load
    // "schemaSource": "./serialization-schema.json",
    // "dataSource": "./serialization-data.json",

   
        "schema": {
        "type": "object",
        "required": false,
        "properties": {
            "lat": {
                "type": "string",
                "required": false
            },
            "long": {
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
                    // Send the data to the server via HTML POST
                    $.ajax({
                      type: "POST",
                      url: "geolocation/create",
                      data: {json:JSON.stringify(formData)},
                      // Render response from server in alert box
                      success: function(data, msg, xhr) {
                        alert(msg);
                        } // success
                     }); // ajax
	           // this.clear(true);
                   } // click
                 }, // submit
                "reset": {}
              } // buttons
           }, // form

        "fields": {
            "lat": {
                "type": "text",
                "label": "Enter latitude",
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40
            },
            "long": {
                "type": "text",
                "label": "Enter Longitude",
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
    "data": {
        "isBox": "false"
    }
});
}
