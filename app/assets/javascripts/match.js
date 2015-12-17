

  function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344; 
    dist = dist * 1000; 
    return dist
  }

  function getArrMatch(arr, radio, tiempo) {

    if (arr.length > 1) {
      var rMin = 1000;
      var tMin = 365;
      var raMin = 1000;
      var tiMin = 365;
      var arr_final = [];
      var arr_temp = [];
      var arr_obj = [];

      for (var i = 0; i < arr[0].length; i++) {  
        if (arr[0][i]['longitude'] != null) {      
          arr_obj = [arr[0][i], distance(arr[0][i]['latitude'],arr[0][i]['longitude'],arr[0][i]['latitude'],arr[0][i]['longitude'])]
          arr_temp.push(arr_obj);
          for (var n = 1; n < arr.length; n++) {  
            for (var m = 0; m < arr[n].length; m++) {  
              if (arr[n][m]['longitude'] != null) {      
                arr_obj = [arr[n][m], distance(arr[n][m]['latitude'],arr[n][m]['longitude'],arr[0][i]['latitude'],arr[0][i]['longitude'])]
                
                var d1 = arr[n][m]['created_time'];
                var d2 = arr[0][i]['created_time'];

                if (rMin > arr_obj[1]) { rMin = arr_obj[1]};
                if (tMin > convertToDay(d1, d2)) {tMin = convertToDay(d1, d2)};
                if ((raMin > arr_obj[1]) && (tiMin > convertToDay(d1, d2))) {
                  raMin = arr_obj[1];
                  tiMin = convertToDay(d1, d2);
                };


                if ((arr_obj[1] < radio)&&(tiempo > convertToDay(d1, d2))){
                  if (arr_obj[1] < 5) {
                    arr_obj[0]['longitude'] = arr_obj[0]['longitude'] + 0.0002
                    arr_obj[1] = 2;                      
                  };
                  arr_temp.push(arr_obj);
                };
              };
            }
          }
        };
      arr_final.push(arr_temp);
      arr_temp = [];  
      }

    radioMin(rMin);
    timeMin(tMin);
    radioTimeMin(raMin, tiMin); 

    return arr_final;  
    } 
    else {
      return arr_final;
    };
  }

  function convertToDay(date1, date2) {

    var days = 0;

    date1 = date1.split('-');
    date2 = date2.split('-');
    var day1 = date1[2].split('T');
    var day2 = date2[2].split('T');
    var d1 = new Date(date1[0], date1[1], day1[0]);
    var d2 = new Date(date2[0], date2[1], day2[0]);

    milisec = d1 - d2;
    days = (((milisec/1000)/60)/60)/24;
    days = Math.abs(days);

    return days;
  }


  function radioMin(radio){

    $(".frase-radio").text('The minimum distance between two pictures is ' + Math.round(radio) + ' meters.');    
  }

  function timeMin(time){
    $(".frase-time").text('There is a picture taken at the same place about ' + time + ' days apart.');
  }

  function radioTimeMin(radio, time){
    $(".frase-radio-time").text('Pictures were taken with a distance of ' + Math.round(radio) + ' meters, and ' + time + ' days apart.');
  }