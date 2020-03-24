
// //Log out response





var city = $("#searchCity").val(); 
const apiKey = "eece1c3c2273cd05dc5b72391dfffc90";

let date = new Date();

//Click search button
$("#button").click(function () {
    $('#weatherH2').addClass('show');

    //Get value from search form
    city = $("#button").val("");



    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    
//Make AJAX call weather API
    $.ajax({
        url: queryUrl,
        method: "GET"

    })
        .then(function (response) {
            console.log(response)
            console.log(response.name)
            console.log(response.weather[0].icon)

        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))
            // //Go into response, get terperature, humidity, wind speed, and uv x
        $('#todayCity').empty();
        const card = $("<div>").addClass("card");
        const cardBody = $("<div>").addClass("card-body");
        const city = $("<h3>").addClass("card-title").text(response.name);
        const cityDate = $("<h3>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
        const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
        const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

        city.append(cityDate, image)
        cardBody.append(city, temperature, humidity, wind)
        card.append(cardBody);
        $("#todayCity").append(card)

        }
        function getTodayWeather() {

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
                method: "GET"
              }).then(function (response){
            
                console.log(response)
                console.log(response.dt)
                $('#forecast').empty();
            
                let results = response.list;
                console.log(results)
                
                for (let i = 0; i < results.length; i++) {
            
                  let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
                  let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
                  console.log(day);
                  console.log(hour);
            
                  if(results[i].dt_txt.indexOf("12:00:00") !== -1){
                    
                    let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                    let tempF = Math.floor(temp);
            
                    const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                    const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                    const cityDate = $("<h3").addClass("card-title").text(date.toLocaleDateString('en-US'));
                    const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                    const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
            
                    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
            
                    cardBody.append(cityDate, image, temperature, humidity);
                    card.append(cardBody);
                    $("#weather").append(card);
                  }
                }
            }
        );