window.addEventListener('DOMContentLoaded', function(){
    

    const trackbtn = this.document.getElementById("trackbtn")
    var loc = document.getElementById("loc");
    var abc = document.getElementById("abc");


    if (loc.value == '') {
        abc.innerHTML = '<p>Search is disabled till you enter something in the location</p><button id="searchbtn" style="background-color: red; color: white; padding: 10px; border-radius: 12px;" disabled>Disabled Search</button>'
    }
    else {
        abc.innerHTML = '<button id="searchbtn" style="background-color:green; color: white; padding: 10px; border-radius: 12px;">Search</button>'
    }



    function buildSelect(){




        let apiUrl = 'https://weatherdbi.herokuapp.com/data/weather/'

        fetch(apiUrl+loc.value.toLowerCase().replace(' ',''))
        .then(function(res){
        return res.json();      
        })
        .then(function(jsonData){
            if (!jsonData.status) {

                console.log(jsonData);
                console.log(jsonData.currentConditions);
                console.log(jsonData.next_days[0]);

                document.getElementById("currentdaytitle").innerHTML = "<h3>Today:</h3>";

                var mycurcard = ""
                mycurcard+= "<div class='card-lay' style='background-color: green'>"
                mycurcard+= "<h3 id='day'>" + jsonData.currentConditions.dayhour + "</h3>"
                mycurcard+= "<p id='icon'>"+ jsonData.currentConditions.comment +"<img src=" + jsonData.currentConditions.iconURL   + "></p>"
                mycurcard+= "<p id='maxtemp'>Temp: " + jsonData.currentConditions.temp.c + "C, Humidity: " +    jsonData.currentConditions.humidity + ", Wind: " + jsonData.currentConditions.wind.mile +  " mile</p>"
                mycurcard+= "</div>"  


                mycurcard+= "<div class='card-lay' style='background-color: green'>"
                mycurcard+= "<h3 id='day'>" + jsonData.next_days[0].day + "</h3>"
                mycurcard+= "<p id='icon'>"+ jsonData.next_days[0].comment +"<img src=" + jsonData.next_days[0].iconURL   + "></p>"
                mycurcard+= "<p id='maxtemp'> Max Temp: " + jsonData.next_days[0].max_temp.c + "C , Min Temp:" +  jsonData.next_days[0].min_temp.c + "C</p>"
                mycurcard+= "</div>"   
    

                document.getElementById("currentday").innerHTML = mycurcard;



                var r = document.getElementById("region");
    
                r.innerHTML = jsonData.region;
                console.log(Object.values(jsonData.next_days))
    
    
    
                document.getElementById("nextdaystitle").innerHTML = "<h3>Next 7 Days:</h3>";


                var mycard = ""

                for (var next of jsonData.next_days.slice(1)) {



                    mycard+= "<div class='card-lay' style='background-color: orange'>"
                    mycard+= "<h3 id='day'>" + next.day + "</h3>"
                    mycard+= "<p id='icon'>"+ next.comment +"<img src=" + next.iconURL   + "></p>"
                    mycard+= "<p id='maxtemp'> Max Temp: " + next.max_temp.c + "C , Min Temp:" +  next.min_temp.c + "C</p>"
                    mycard+= "</div>"                    

                }
                
                document.getElementById("nextdays").innerHTML = mycard;


            }

            else {
 
                var r = document.getElementById("region");
                r.innerHTML = '<h3 style="color: red"> Error  : ' + jsonData.message + ' </h3>';
                document.getElementById("currentdaytitle").innerHTML = "";
                document.getElementById("currentday").innerHTML = "";
                document.getElementById("nextdaystitle").innerHTML = "";
                document.getElementById("nextdays").innerHTML = "";


            }





            
        })
        .catch(error => console.log(error));


    }


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            r.innerHTML = "<h3 style='color: red'>Geolocation is not supported by this browser</h3>";
            
        }
    }
    

    function showPosition(position) {
        var x = document.getElementById("demo");
        //x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        loc.value = position.coords.latitude + "," + position.coords.longitude;
        activateSearch();
        buildSelect();

    }



    function activateSearch(e){
        if (loc.value == '') {
            abc.innerHTML = '<p>Search is disabled till text in location is blank</p><button id="searchbtn" style="background-color: red; color: white; padding: 10px; border-radius: 12px;" disabled>Disabled Search</button>'
        }
        else {
            abc.innerHTML = '<button id="searchbtn" style="background-color:green; color: white; padding: 10px; border-radius: 12px;">Search</button>'
            searchbtn.addEventListener('click', buildSelect)
        }
    }


    loc.addEventListener('input', activateSearch)
    trackbtn.addEventListener('click', getLocation)
    

}); //end DOMContentLoaded
