$(document).ready(function() {
  jQuery('#mainSearchForm').submit(function(event) {
    console.log("Asd");
    event.preventDefault();
    jQuery('html, body').animate({
      scrollTop: jQuery('#searchResults').offset().top -72
    }, 1000);
  });

  jQuery('.allBars').select2();

});
