

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

  function getArrMatch(arr, radio) {

    if (arr.length > 1) {
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
                if (arr_obj[1] < radio) {
                  if (arr_obj[1] < 5) {
                    debugger;
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
    return arr_final;  
    } 
    else {
      return arr_final;
    };
}


