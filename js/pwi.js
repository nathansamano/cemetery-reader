pwi_form = function() {
var $viewerSelected = 'fancybox',
settings = {
          username: 'brianc@palaver.net',
          popupPlugin: $viewerSelected,
          showPhotoDownload: true,
          showPhotoCaption: true,
          thumbSize: 1024,
          photoSize: 1600,
	  showPhotoDate: true,
	  maxResults: 1,
          };
$(".cem-shell-plugin-content").pwi(settings);
};
