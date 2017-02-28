function getUrlParam(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
function checkIfDoubleParam(Param){
  var param = '?'+Param+'=1';
  var url = window.location.href;

  if(getUrlParam(Param) == 1){
    window.location.href = getCleanUrl(url) + param;
  }
  else{
    window.location.href = url+param;
  }
                  
}
function getCleanUrl(url){
    var resUrl = url.split('?');
    var mainUrl = resUrl[0];
    
    return mainUrl;
}
function getEuroString(number){
  var n = parseFloat(number).toFixed(2);

  return '€'+n;
}
function getOnOff(sex){
  var onOff;
   if(sex == "V"){
      onOff = false;
  }
  else{
      onOff = true;
  }
  return onOff;
}
function setBackgroundFullWindowSize(selector){
  var window_height = window.innerHeight;
  var header_height = $("#header").height();

  var map_height = window_height - header_height;
  var map_width = window.innerWidth-17;

  $(selector).height(map_height);
  $(selector).width(map_width);

}
function getSex(input){
  var sex;
  if(input == "on"){
      sex = "V";
  }
  else{
      sex = "M";
  }
  return sex;
}

function makeDate(date){
  var year = date.substr(0,4);
  var month = date.substr(5,2);
  var day = date.substr(8,2);

  var d = new Date(year, month, day);

  return d;
}
function setDateToString(date){
  day = pad2(date.getDay());
  year = pad2(date.getFullYear());
  month = pad2(date.getMonth());

  return year+"-"+month+"-"+day
}
function pad2(number) {
  return (number < 10 ? '0' : '') + number
}
function countDays(dateStart){
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

  var d = new Date();

  var today = new Date(d.getFullYear(),d.getMonth()+1,d.getDate());
  
  return Math.round(Math.abs((dateStart.getTime() - today.getTime())/(oneDay)));
}