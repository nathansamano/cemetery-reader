pwi_form = function() {
var $viewerSelected = 'fancybox',
settings = {
          username: 'brianc@palaver.net',
          popupPlugin: $viewerSelected,
          showPhotoDownload: true,
          showPhotoCaption: true,
          showPhotoFilename: true,
          thumbSize: 1024,
          photoSize: 1600
          };
$(".cem-shell-main-content").pwi(settings);
};
