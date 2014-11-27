/*
 * cem.js
 * CMP343 Project base script
*/

var cem = (function () {
  'use strict';
  var initModule = function ( $container ) {
    // cem.data.initModule();
    // cem.model.initModule();
    cem.shell.initModule( $container );
  };

  return { initModule: initModule };
}());
