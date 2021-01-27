function getJSON(url) {
    var resp;
    var xmlHttp;

    resp  = '';
    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null)
    {
    xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
     }

    return resp;
}



var str1 = getJSON('resources/old.json');
var str2 = getJSON('resources/new.json');
var str3 = getJSON('resources/map.json');
var obj1 = JSON.parse(str1);
var obj2 = JSON.parse(str2);
var obj3 = JSON.parse(str3);

var rows = "";

// Modal starts here
var map = obj3['url'];
document.getElementById('map').setAttribute('src', map)
//$("#map").attr("src", map);

// Get the modal
var modal = document.getElementById('mapModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('map');
var modalImg = document.getElementById("map01");

modal.addEventListener('click', function(){
  this.style.display="none";
})

var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = 'Avonmora Today';
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// End modal

for (var i = 0, len = Object.keys(obj1).length; i < len - 1; i +=1) {
    ind = [i+1];
    key = Object.keys(obj1)[i];
    yesterday = Number(obj1[key]['pop']);
    today = Number(obj2[key]['pop']);
    flag = '<img src="https://s2.piratesglory.com/images/countries/' + obj2[key]['controlled_by'] + '.gif">  '

    difference = function() {
      var result;
      var style;
      result = today - yesterday;
      if (result < 0) {
        style = ' class = negative>' + result.toLocaleString();
      } else if (result > 0){
        style = ' class = positive> +' + result.toLocaleString();
      } else {
        style = '>' + result;
      }
      return style;
    }

    rows += '<tr><td>'+ flag + key + '</td><td>' + yesterday.toLocaleString() + '</td><td>' + today.toLocaleString() + '</td><td' + difference() + '</td></tr>';
};



(function() {
    
    document.getElementById('yesterday').innerHTML = new Date(obj1['timestamp'] * 1e3).toISOString().slice(0, 10);
    document.getElementById('today').innerHTML = new Date(obj2['timestamp'] * 1e3).toISOString().slice(0, 10);

    
    
    var table = document.getElementById('dataTable');
    table.innerHTML += rows;
    
})();


/*jQuery(document).ready(function(){
  $(rows).appendTo( "#dataTable" );
});*/
