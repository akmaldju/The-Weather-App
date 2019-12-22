var check = true;
$(document).ready(function(){
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude).done(update).fail(handleErr);
  });
}
});

function upd(lat, long){
  console.log("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +"," + long + "&sensor=false");
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +"," + long + "&sensor=false").done(updateAddress).fail(handleErr);
}

function update(result){
  $("#icon").css("background-image","url(" + JSON.stringify(result.weather[0].icon) + ")");
  console.log("url(" + JSON.stringify(result.weather[0].icon) + ")");
  $("#temperature").html("<span>" + JSON.stringify(result.main.temp + "</span> <a id='temp'>&degC</a>").replace('"', '').replace('"', ''));
  $("#pressure").html(JSON.stringify(result.weather[0].description).replace('"', '').replace('"', ''));
upd(JSON.stringify(result.coord.lat), JSON.stringify(result.coord.lon));
}

function updateAddress(result){
console.log("where?");
console.log(result);
$("#location").text(JSON.stringify(result.results[3].address_components[2].short_name).replace('"', '').replace('"', '') + ", "+ JSON.stringify(result.results[3].address_components[4].long_name).replace('"', '').replace('"', ''));
  console.log("here?");
}

function handleErr(jqxhr, textStatus, err) {
  console.log("Requested Failed: " + textStatus + ", " + err);
}

$('#temperature').click( function(){
  console.log("strange");
  var tempy = $('#temperature span').text();
  var far = parseFloat(tempy);
  if(check){
    console.log("stranger");
    $('#temperature span').text((far*1.8+32).toFixed(2));
    $('#temp').html('&degF');
    check = false;
  }
  else{
    $('#temperature span').text(((far-32)/1.8).toFixed(2));
    $('#temp').html('&degC');
    console.log("lol");
    check = true;
  }
});

$( window ).resize(responsive);

function responsive(){
  var obj = $("body").width();
  if(obj <= 900){
    $('#wrapper').css("width","90%");
    $('#widget').css("width","100%");
    $('#widget').css("min-width","0");
  }
  else{
    $('#wrapper').css("width","80%");
    $('#widget').css("width","40%");
    $('#widget').css("min-width","450px");
  }
}