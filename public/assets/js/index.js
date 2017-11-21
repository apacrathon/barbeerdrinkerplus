$(document).ready(function() {
  jQuery('#mainSearchForm').submit(function(event) {
    event.preventDefault();
    jQuery('html, body').animate({
      scrollTop: jQuery('#searchResults1').offset().top -85
    }, 1000);
  });
  jQuery('.allBars').select2({
    minimumInputLength: 2
  });
  jQuery('.allStates').select2();
  jQuery('.allGenders').select2();
  jQuery('.allDrinkers').select2({
    minimumInputLength: 2
  });
  jQuery('.allFriends').select2({
    minimumInputLength: 2
  });

  jQuery('#oldDrinkerButton').click(function() {
    jQuery('#oldDrinkerForm').removeClass().addClass("modalFormShown");
    jQuery('#newDrinkerForm').removeClass().addClass("modalFormHidden");
    jQuery('#oldDrinkerButton').removeClass().addClass("btn btn-primary");
    jQuery('#newDrinkerButton').removeClass().addClass("btn btn-default");
  });

  jQuery('#newDrinkerButton').click(function() {
    jQuery('#newDrinkerForm').removeClass().addClass("modalFormShown");
    jQuery('#oldDrinkerForm').removeClass().addClass("modalFormHidden");
    jQuery('#newDrinkerButton').removeClass().addClass("btn btn-primary");
    jQuery('#oldDrinkerButton').removeClass().addClass("btn btn-default");

  });
  jQuery('#oldDrinkerButtonCheck').click(function() {
    jQuery('#oldDrinkerFormCheck').removeClass().addClass("modalFormShown");
    jQuery('#newDrinkerFormCheck').removeClass().addClass("modalFormHidden");
    jQuery('#oldDrinkerButtonCheck').removeClass().addClass("btn btn-primary");
    jQuery('#newDrinkerButtonCheck').removeClass().addClass("btn btn-default");
  });

  jQuery('#newDrinkerButtonCheck').click(function() {
    jQuery('#newDrinkerFormCheck').removeClass().addClass("modalFormShown");
    jQuery('#oldDrinkerFormCheck').removeClass().addClass("modalFormHidden");
    jQuery('#newDrinkerButtonCheck').removeClass().addClass("btn btn-primary");
    jQuery('#oldDrinkerButtonCheck').removeClass().addClass("btn btn-default");

  });



});
