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
            + '<h1>CEM/SPA</h1>'
            + '<p>The past is a gift to the future . . </p>'
          + '</div>'
          + '<div class="cem-shell-head-acct"></div>'
        + '</div>'
        + '<div class="cem-shell-main">'
	  // Display main menu; this needs to be done with code
          + '<div class="cem-shell-main-nav">'
	  + '<h4>Temporary Menu:</h4>'
          + '</div>'
          + '<div id="cem-shell-main-content"><ul>'
	  + '<li><a href="#geopoint">Geopoint</a></li>'
    	  + '<li><a href="#cemetery">Cemetery</a></li>'
	  + '<li><a href="#marker">Marker</a></li>'
	  + '<li><a href="#plugin">PWI Plugin</a></li></ul>'
          + '<div id="cemetery"></div>'
          + '<div id="geopoint"></div>'
          + '<div id="marker"></div>'
          + '<div id="plugin"></div>'
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
    setChatAnchor,    initModule,     $activeDiv,
    $divToHide,	      cemValid,	      geoValid,
    markerValid,      pwiValid,	      routes,
    router, 	      
    clear,
    swapDivs;
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
      $main	 : $container.find('#cem-shell-main-content'),
      $cem	 : $container.find('#cemetery'),
      $pwi	 : $container.find('#plugin'),
      $geo	 : $container.find('#geopoint'),
      $marker	 : $container.find('#marker'),
      $menu	 : $container.find('.cem-shell-list-menu'),
      $footer 	 : $container.find('.cem-shell-foot')
    };
  };
  // End DOM method /setJqueryMap/

  // swapDivs: convenience function when switching screens 
  swapDivs = function($newDiv) {
	  // Old is same as new
          if ( $activeDiv == $newDiv ) {
	    $newDiv.show();
            return
	    };

	  // Swap new one in 
	  $divToHide = $activeDiv;
          $activeDiv = $newDiv;
          if (typeof($divToHide) != 'undefined') $divToHide.hide();
          $newDiv.show();
          return;
          }

  clear = function() {
          cemValid = geoValid = markerValid = pwiValid = false;
          jqueryMap.$footer.empty();
          jqueryMap.$cem.empty();
          jqueryMap.$geo.empty();
          jqueryMap.$pwi.empty();
          jqueryMap.$marker.empty();
          $activeDiv.hide();
          // if (typeof($activeDiv) != 'undefined') delete self.$activeDiv;
          // Unset any lingering coordinates, too
          if ( typeof(returnDataMap) == 'object')
            delete pwi.returnDataMap['coordinates'];
          document.location.hash="";
	  }



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
    // React to taps on menu in nav div
    var menu_item  = $(this).data("id");
    // console.log('Tapped on ' + menu_item);
    switch(menu_item) {

	case 'cemetery':
	  document.location.hash="";
	  swapDivs(jqueryMap.$cem);
          if (  cemValid  == false ) {
            cemValid = true;
	    jqueryMap.$cem.append(cem_form());
	    }
	  break;

	case 'geopoint':
	  swapDivs(jqueryMap.$geo);
          if ( geoValid == false || pwiValid == true ) {
            geoValid = true;
	    jqueryMap.$geo.empty();	
            jqueryMap.$geo.append(geo_form(pwi.returnDataMap,'Marker'));
            }
	  break;

	case 'marker':
	  document.location.hash="";
	  swapDivs(jqueryMap.$marker);
          if ( ! markerValid ) {
            markerValid = true;
            jqueryMap.$marker.append(marker_form());
            }
          break;

	case 'pwi':
	  document.location.hash="";
	  swapDivs(jqueryMap.$pwi);
          if ( ! pwiValid ) {
            pwiValid = true;
            jqueryMap.$geo.append(pwi_form());
            }
          break;

	case 'pwi-get':
	  jqueryMap.$footer.empty();
	  jqueryMap.$footer.append(JSON.stringify(pwi.returnDataMap));
	  // console.log(JSON.stringify(pwi.returnDataMap));
	  break;
	case 'clear':
	  // Set everything back to starting state . . 
	  cemValid = geoValid = markerValid = pwiValid = false;
	  jqueryMap.$footer.empty();
	  jqueryMap.$cem.empty();
	  jqueryMap.$geo.empty();
	  jqueryMap.$pwi.empty();
	  jqueryMap.$marker.empty();
	  $activeDiv.hide();
	  // if (typeof($activeDiv) != 'undefined') delete self.$activeDiv;
	  // Unset any lingering coordinates, too
	  if ( typeof(returnDataMap) == 'object') 
	    delete pwi.returnDataMap['coordinates'];
	  document.location.hash="";
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

    jqueryMap.$cem.append(cem_form());
    jqueryMap.$geo.append(geo_form(pwi.returnDataMap,'Marker'));
    jqueryMap.$marker.append(marker_form());
    jqueryMap.$geo.append(pwi_form());

    // Try those tabs again
    jqueryMap.$main.tabs();


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
