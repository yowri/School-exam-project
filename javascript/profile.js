$(function(){
     init();
     
});
function init(){
  initAccount();
  initPersonal();

  
}
function initAccount(){
    showCourses();

  categoryClick();

  displayCategory('.active-category');

}
function initPersonal(){
  showSaved();

  setInputs();

  checkEqual('password','Wachtwoord komt niet overeen');

  checkEqual('mail','Email komt niet overeen');

  submitUserData();

}
// global page functions 
function displayCategory(selector){

   $('.show-category').hide();

  var category = $(selector).attr('class').split(" ")[0].substr(4);
  var categorySelector = $('.'+category);

  categorySelector.show();
  
}
function categoryClick(){
$('.profile-nav li').click(function(){

    $('.profile-nav li').removeClass('active-category');
    $(this).addClass('active-category');

    displayCategory(this);
});
}


// account view functions
function showMoreClick(element,data){
  var detailElement;
  var selector;
  var count = 0;

    $(element).find('.btn').click(function(event){

      count ++;

      selector =  $(this).parent().parent().next();

      if(selector.find('table').hasClass('counter-table')){

        selector.empty();
      }
      else{
        $('.show-more').empty();

        detailElement =  $.parseHTML(setDetailDataInTemplate(data));

        selector.append(detailElement);
      }
      
      countUp(data.aantal_deelnemers,data.max_deelnemers,makeDate(data.datum_begin));
      downloadPDF(data);

      if(data.facs[0].Openstaand > 0){
        $('.betalen').append('<a href="checkout?ID='+data.facs[0].ID+'&price='+data.prijs+'">betalen</a>');
        $('.get-pdf').hide();
      }
    
  });
 
    
}



function countUp(currentMembers,maxMembers,dayStart){

 var daysToStart = countDays(dayStart);

  var options = {
    useEasing : true, 
    useGrouping : true, 
    separator : ',', 
    decimal : '.', 
    prefix : '', 
    suffix : '' 
  };
  var current = new CountUp("current-subs", 0, currentMembers, 0, 1.5, options);
  var max = new CountUp("max-subs", 0, maxMembers, 0, 1.5, options);
  var day = new CountUp("day-sub", 0, daysToStart, 0, 1.5, options);

  current.start();
  max.start();
  day.start();
};
function showCourses(){

    var selector = $('.sub-table').find('.course-body');
    var courseElement;

    getCombinedData(getUserID, function(result){

      for(var i = 0; i < result.length ; i++){

            courseElement = $.parseHTML(setCourseDataInTemplate(result[i]));

            selector.append(courseElement);

            console.log(result[i]);

            showMoreClick(courseElement,result[i]);
      }
   });
  
}
function returnInstructeurs(data){

  var insStr,fullName;
  for(var i = 0; i < data.ins.length; i++){

    fullName = getFullName(data.ins[i].Voornaam,data.ins[i].TussenVoegsel,data.ins[i].Achternaam);
    if(insStr == null){
      insStr = fullName;
    }
    else{
      insStr +', '+fullName;
    }

  }
  if(insStr == undefined){
    insStr = "niet bekend";
  }
  return insStr;
}
function getFullName(first,middle,last){
var fullName;
 if(middle == ''){
    fullName = first+' '+last;
 }
 else {
    fullName = first+' '+middle+' '+last;
 }
 return fullName;

}
function setCourseDataInTemplate(data){

  var template = `<tr>
        <td>`+data.naam+`</td>
        <td>`+data.datum_begin+`</td>
        <td>`+data.datum_eind+`</td>
        <td>`+returnInstructeurs(data)+`</td>
        <td><a class="waves-effect waves-light base-color btn floatRight">Details</a></td>
      </tr>
      <tr class="detail-row show-more">
          
      </tr>`;

      return template;

}

function getDatePast(date){
  d = makeDate(date);
  d.setDate(d.getDay() + 30);

  return setDateToString(d);
}
function setDetailDataInTemplate(data){
    var template = `<td  class="td-wrapper" colspan="5">
                <table class="counter-table">
                  <tr>
                    <td><span id="current-subs" class="counter"></span></td>
                    <td><span id="max-subs" class="counter"></span></td>
                    <td class="counter"><span id="day-sub" ></span></td>
                  </tr>
                  <tr class="counter-text">
                    <td>Aantal deelnemers</td>
                    <td>Max deelnemers</td>
                    <td>Dagen begin </td>
                  </tr>
                </table>
                <table class="order-table">
                  <tr>
                    <th>Nummer</th>
                    <th>Datum inschrijving</th>
                    <th>Bedrag</th>
                    <th>Vervaldatum</th>
                    <th>Betaald</th>
                    <th>Openstaand</th>
                    <th>Factuur</th>
                  </tr>
                  <tr>
                    <td>`+data.facs[0].OrderNummer+`</td>
                    <td>`+data.facs[0].DatumBetaald+`</td>
                    <td>`+getEuroString(data.prijs)+`</td>
                    <td>`+getDatePast(data.facs[0].DatumBetaald)+`</td>
                    <td>`+getEuroString(data.facs[0].Betaald)+`</td>
                    <td class="betalen">`+getEuroString(data.facs[0].Openstaand)+`</td>
                    <td><a  class="get-pdf">download</a></td>
                  </tr>
                </table>
              </td>`;
    
      return template;
}
function submitUserData(){
    $('.save_data').click(function(){
      checkEmptyInput();

      if(!$('#account-form input').hasClass('invalid')){
          updateUser(function(result){
              if(result > 0){
                  Materialize.toast('e-mail bestaad al',2000);
              }
              else{
                  setUser();

                  checkIfDoubleParam('save');

                  Materialize.toast('gebruiker opgeslagen',2000);
              }
              submitCallback();
          });
          
      }        
    });
  }

function submitCallback(){
$('#account-form input').each(function(i){
    $(this).removeClass('valid');
  });
    $('.empty_after').val('');
}

function makePDF(data){

  userFullName = getFullName(currentUser.Voornaam, currentUser.TussenVoegsel, currentUser.Achternaam);

  var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAEAAAABAACyZ9yKAAACo1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9daSUNAAAA33RSTlMAAQIDBAUGBwgJCgsMDQ4PERITFBUWFxgZGhscHR4fICEiIyQlJicoKissLS4vMTM0NTY3ODk6Ozw/QEFCQ0RIS0xOUFFTVFVWV1hZWltdXl9gYWNkZWZoaWtsbW5vcHFyc3R1d3p7fH1+f4GCg4WGh4mKi4yNjo+RkpOUlZaYmZqbnJ2en6ChoqOkpqeoqaqrrK2usLGytLW2t7i5uru8vb6/wMHCw8TGx8jJyszNzs/Q0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+eC7IcQAAAAFiS0dE4CgP/zAAAAXISURBVBgZ7cGLf9VjHAfwz7Zmo1ppq6ax0czdzP02FLpIzF0h17DcMuS2ilzWRaXcSlQMZYroYsslEZpUW432bGc7n3/FXXiec7Zzzu+8Xr6/5/t+QymllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimlVDoMqBh16+Ovrtm4pXlvV/vOrRvfn3//lWcNgheyT5pQ1xilS+OsK45AuOWNW7CHcTXedxzCKqdqWQd7oXHKEIRQ0QM/src6ZpcjZE5YFGFC3jsPIVL0fDcT9mY5QiJv6j4mI/pCCcLg/G1M1s+3ZEK6A5+MMgUfHAvZKpqYmo4pWRBsfDtTVj8UUmXcyyA0V0Km3AUMRnc1JDqonkExECh3JXu0d/27ry+e+9KKtU07GI+BPDlvMK7NddefnI/9Bp1z49MbGIOBOH2WMLbuVZOK4HL4zfUROhiIU8uYWqcVI7b86mZaDKS5hrG03tEf8eVcvYn/YSDM6R1065qZj55lXLuT/2IgS+F2un15Knpn0LNR/oOBLEvpNrc/eu30z7ifgShX0al7EhKR9xL/ZiDJsFa6mDFI0K0R/slAkqV0aa9Ews74jn8wEGQMXSIXIgnFm/k7AzmyP6dLFZJS8BF/YyDHRLo8jCTl1fNXBmL0+4EO7/VBsnJeIWkgxr10+PEQJC97GWkgRd8WOlyOVBy4igZSTKTDCqRmwDoDITI202aGI0UFH0OIEXR4DCkbCiGW0/bTYHjj0ChtU+GP22kzBfDHh7TVwR+ldKiAP6ppWwOPrKPtJvgjP0pLdyH8MZa2d+GRp2i7AR75krYy+KOEtm/gkUtpew4eeYi2y+CR5bSVwiM7aGmBR4bR9hY8MpK2GoRYRiPT5lEIMJJp01UMAeqZNgshQDnT5xQIMI9pswoCDOtk2lwMAWqYNl9k4v+vXwvTZiIEmMS02d0X/39ZW5g2UyHAaKZNRyEEaGDazIZM/Wn7FB4ZQNtqeGQgbUvgkSG0vQiPFNFWB4+U0PYMPDKctpnwyJG0zYBHymibDo8cRVstPHI0bbXwyFG01cIjZbRNh0eG0zYTHimh7Rl4pIi2OnhkCG0vwiMDaVsCjwygbTU80p+2TxFqGY0MUDnEGckArYQ89QzQBRCnnAFaD3nmMUBVEGdYJ4PzbTbEqWGA7oA4/VoYnD15EGcSA/QIxMnawuB0FkGc0QzQHMjTwACdgHAYSVsNPHIobSvgk1207IJP3qatBB55jLbR8MgVtE2HR46hrQk+aabtEHhkPm1V8Mi1tL0Mj5TS1t4PHvmatnHwyAzaXoZHzqWtcyj8kdlMWzU8Mp22b7Lgj7PpMAb+yNxG24YM+ONuOoyFPwoMbZuykKqxkKKODjciRSPaIMVJdNhTiJScuc9AjFV0WIBUHLebBmJU0mUcklfyHWkgx3I67C1Fskq3kjSQoyJKh3W5SM7x2/krA0EW0WVxJpJx6m7+xkCQIw1dZiAJlW38nYEkd9HpASTsug7+wUCSPh/TaUYmEpL7LP9iIEp5hE4Lc5GA4o/4NwNZptLtkzL02iU7uZ+BLNmr6dZWhd454g3+k4Ewhd8zhreOQc8OuHMf/8VAmjM6GUPkiSLEl3fbNv6HgTgTGFPnnBMRW1FNKy0G8tQwjg13l8Hl6MkNUToYCPQE4/p6/g2nFWC/gsqbn2tiDAYCZcxij9rWv7N00ZzFK9Y07WA8BhJlzmFQ2iFSxoMMxq4REOrqTgag4TCIdV4LU/ZoNgQb3sDUfDsCsmVNiTB50Zl5EO/kJibrs7MRBjmTW5mMlsm5CIn82ggTZaYdjBApm93BRLTPKkbIDJ7yPXtre3UBQij70tfa2bOulZcfgLDqO/qFVsbT/c6EwQi3PuXXP98YpUNk7bSLBsEPeRWjbnvytbWbvvqhrcvs3Lpx9dx7xp/SF0oppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoplYhfAIclFehfuft+AAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDEzLTAxLTIxVDIzOjU0OjA5LTA2OjAwzz41DQAAACV0RVh0bW9kaWZ5LWRhdGUAMjAxMy0wMS0yMVQyMjo1MDozNS0wNjowMA3dV1EAAAAASUVORK5CYII=';

  var doc = new jsPDF();
  doc.setFontSize(18);
  doc.setFontType("bold");
  doc.text(20, 50, 'Factuur');
  doc.text(20, 20, 'Plaatje');
  doc.setFontSize(14);
  doc.setFontType("normal");
  doc.text(20, 60, userFullName);
  doc.text(20, 66, currentUser.Adres);
  doc.text(20, 72, currentUser.Postcode+' '+currentUser.Doetinchem);
  doc.setFontSize(16);
  doc.setFontType("bold");
  doc.text(140, 20, 'LOGO');
  doc.setFontSize(14);
  doc.setFontType("bold");
  doc.text(140, 30, 'De Waai B.V');
  doc.setFontSize(14);
  doc.setFontType("normal");
  doc.text(140, 36, 'NanneWiid 12');
  doc.text(140, 41, '8314 PM Earnewoude');
  doc.text(140, 46, 'Nederland');
  doc.text(140, 56, 'TEL: 05134 56 78 34');
  doc.text(140, 61, 'MAIL: DeWaai@hotmail.com');
  doc.setFontType("bold");
  doc.text(20, 90, 'Klantnummer :');
  doc.text(20, 96, 'Factuurnummer : ');
  doc.text(20, 102, 'Factuurdatum : ');
  doc.text(20, 108, 'Ordernummer : ');
  doc.setFontType("normal");
  doc.text(70, 90, 'Klantnummer ');
  doc.text(70, 96, data.facs[0].FactuurNummer);
  doc.text(70, 102, data.facs[0].FactuurDatum);
  doc.text(70, 108, data.facs[0].OrderNummer);
  doc.setFontSize(10);
  doc.text(20, 123, 'Cursus');
  doc.text(100, 123, 'BTW');
  doc.text(120, 123, 'Prijs per stuk');
  doc.text(150, 123, 'aantal');
  doc.text(170, 123, 'Prijs inclusief btw');
  doc.text(20, 130, 'naam');
  doc.text(100, 130, '21%');
  doc.addImage(imgData, 'PNG', 15,40, 110, 130);
  doc.text(120, 130, getEuroString(data.prijs));
  doc.text(150, 130, "1");
  doc.addImage(imgData, 'PNG', 15,40, 160, 130);
  doc.text(170, 130, getEuroString(data.prijs));
  doc.setLineWidth(0.5);
  doc.line(20, 125, 200, 125);
  doc.setLineWidth(0.5);
  doc.line(140, 270, 199, 270);
  doc.setLineWidth(0.5);
  doc.line(20, 255, 199, 255);
  doc.setDrawColor(2, 119, 189);
  doc.setLineWidth(1);
  doc.line(130, 20, 130, 60);
  doc.setFontSize(14);
  doc.text(200, 257, '+');
  doc.text(200, 272, '+');
  doc.text(170, 262, '\u20AC');
  doc.text(145, 262, 'subtotaal');
  doc.text(190, 262, data.prijs);
  doc.text(170, 276, '\u20AC');
  doc.text(190, 276, data.prijs);
  doc.text(20, 262, data.facs[0].DatumBetaald);
  doc.setFontType("bold");
  doc.text(145, 276, 'Totaal');
  doc.save(''+data.facs[0].FactuurNummer+'.pdf');
}
function downloadPDF(data){
  $('.get-pdf').click(function(e){
    e.preventDefault();
      makePDF(data);
  });
}
function showSaved(){
  if(getUrlParam('save') == 1){
     Materialize.toast('account opgeslagen',2000);
  }
}
function checkEmptyInput(){
$('#account-form input').not('.empty_after').each(function(i){
      if(!$(this).val()){
          $(this).addClass('invalid');
          $('label').attr('data-error','U hebt niets ingevuld');
       }
  });
}
function checkEqual(selector,message){
  $('.check-equal-'+selector).keyup(function(){
      checkEqualInput(selector,message);
    
  });
  $('.'+selector).blur(function(){
      checkEqualInput(selector,message);
  });
}

function checkEqualInput(selector,message){
  var input = $('.equal-'+selector).val();
  var emptyInputs = $('.empty_after').val();
  var confirmInput = $('.check-equal-'+selector).val();
  
    if(input.length <= 6 && input.length > 0){
      $('.'+selector).addClass('invalid');
      $('#'+selector).next().attr('data-error','Wachtwoord moet minimaal 6 tekens bevatten');
    }
    else{
        if(emptyInputs.length > 0 && confirmInput > 0){
          if(input != confirmInput){
           $('.'+selector).addClass('invalid');
           $('#'+selector).next().attr('data-error',message);
          }
          else{
              $('.'+selector).removeClass('invalid');
              $('#'+selector).next().attr('');
          }
        }
    }
  
  
}
function getCombinedData(userID,cb){
  Database.callFunction({targetFunction:'combineData',data:{id1:userID},callback:function(result){

     cb(result);
  }});
}
