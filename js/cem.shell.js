/*
 * cem.shell.js
 * Shell for Cemetery Project CMP343
*/

cem.shell = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      anchor_schema_map : {
        chat  : { opened : true, closed : true }
      },
      resize_interval : 200,
      main_html : String()
        + '<div class="cem-shell-head">'
          + '<div class="cem-shell-head-logo">'
            + '<h1>CEMSPA</h1>'
            + '<p>The past is a gift to the future . . </p>'
          + '</div>'
          + '<div class="cem-shell-head-acct"></div>'
        + '</div>'
        + '<div class="cem-shell-main">'
          + '<div class="cem-shell-main-nav">'
	  + '<h2>Temporary Menu:</h2>'
	  + '<div class="cem-shell-list-menu"'
          +  ' data-id="cemetery">'
          +  'Cemetery Data Input</div>'
          + '<div class="cem-shell-list-menu"'
          +  ' data-id="geolocation">'
          +  'Geolocation Point Data</div>'
	  +  '<div class="cem-shell-list-menu"'
	  +  ' data-id="pwi">'
	  +  ' PWI Plugin</div>'
	  +  '<div class="cem-shell-list-menu"'
	  +  ' data-id="pwi-get">'
	  +  'Show PWI Data</div>'
          + '<div class="cem-shell-list-menu"'
          +  ' data-id="clear">'
          +  'Clear Areas</div></div>'
          + '<div class="cem-shell-main-content">'
	  + '</div>'
        + '</div>'
        + '<div class="cem-shell-foot"></div>'
        + '<div class="cem-shell-modal"></div>'
    },
    stateMap = {
      $container  : undefined,
      anchor_map  : {},
      resize_idto : undefined
    },
    jqueryMap = {},

    copyAnchorMap,    setJqueryMap,   changeAnchorPart,
    onResize,         onHashchange,   onTapList,
    onTapAcct,        onLogin,        onLogout,
    setChatAnchor,    initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // Returns copy of stored anchor map; minimizes overhead
  copyAnchorMap = function () {
    return $.extend( true, {}, stateMap.anchor_map );
  };
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // I added several valures here for divs I need to manipulate
    jqueryMap = {
      $container : $container,
      $acct      : $container.find('.cem-shell-head-acct'),
      $nav       : $container.find('.cem-shell-main-nav'),
      $main	 : $container.find('.cem-shell-main-content'),
      $menu	 : $container.find('.cem-shell-list-menu'),
      $footer 	 : $container.find('.cem-shell-foot')
    };
  };
  // End DOM method /setJqueryMap/

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------

  // Begin Event handler /onResize/
  onResize = function () {
    if ( stateMap.resize_idto ) { return true; }

    stateMap.resize_idto = setTimeout(
      function () { stateMap.resize_idto = undefined; },
      configMap.resize_interval
    );

    return true;
  };
  // End Event handler /onResize/

  onTapAcct = function ( event ) {
      // React to mouse click w/temporary message
      jqueryMap.$acct.text( '... coming soon ...' );
      setTimeout(function(){
  	jqueryMap.$acct.text( 'Click to sign in' );	
      },3000);
      return false;
  };

  // Event handler /onTapList/
  onTapList = function ( event ) {
    // Testing to see if we can pass menu item via handler
    var menu_item  = $(this).data("id"), form;
    console.log('Tapped on ' + menu_item);
    //jqueryMap.$main.empty();
    switch(menu_item) {
	case 'cemetery':
	  jqueryMap.$main.empty();
	  jqueryMap.$main.append(cem_form());
	  break;
	case 'geolocation':
	  jqueryMap.$main.empty();
	  jqueryMap.$main.append(geo_form(pwi.returnDataMap.coordinates));
	  break;
	case 'pwi':
	  jqueryMap.$main.empty();
	  jqueryMap.$main.append(pwi_form());
	  break;
	case 'pwi-get':
	  jqueryMap.$footer.empty();
	  jqueryMap.$footer.append('<h3>' + JSON.stringify(pwi.returnDataMap) + '</h3>');
	  // console.log(JSON.stringify(pwi.returnDataMap));
	  break;
	case 'clear':
	  jqueryMap.$footer.empty();
	  jqueryMap.$main.empty();
	  break;
	}
    return false;
    };

  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin Public method /initModule/
  // Example   : cem.shell.initModule( $('#app_div_id') );
  // Purpose   :
  //   Directs the Shell to offer its capability to the user
  // Arguments :
  //   * $container (example: $('#app_div_id')).
  //     A jQuery collection that should represent 
  //     a single DOM container
  // Action    :
  //   Populates $container with the shell of the UI
  //   and then configures and initializes feature modules.
  //   The Shell is also responsible for browser-wide issues
  //   such as URI anchor and cookie management
  // Returns   : none 
  // Throws    : none
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    // $.gevent.subscribe( $container, 'spa-login',  onLogin  );
    // $.gevent.subscribe( $container, 'spa-logout', onLogout );

    // Set up for user login
    jqueryMap.$acct
      .text( 'Click to sign in')
      .bind( 'click', onTapAcct );

    jqueryMap.$menu.bind( 'click', onTapList   ); 
    // configure and initialize feature modules
    // This is where the action will soon be
    // spa.input.initModule( jqueryMap.$container );

  // End PUBLIC method /initModule/
  };
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
