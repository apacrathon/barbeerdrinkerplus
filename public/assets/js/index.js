$(document).ready(function() {
  jQuery('#mainSearchForm').submit(function(event) {
    event.preventDefault();
    jQuery('html, body').animate({
      scrollTop: jQuery('#searchResults1').offset().top -85
    }, 1000);
  });
  jQuery('.allBars').select2();
});
