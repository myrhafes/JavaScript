//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locaElement = document.querySelector(".location p");
const notiElement = document.querySelector(".notification");

//APP DATA
const weather = {};

weather.temperature = {
    unit : "celsius"
}

//APP CONSTS & VARS
const kelvin = 273;

//CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notiElement.style.display = "block";
    notiElement.innerHTML = "<p>Browser Doesn't Support Geolocatin</p>"
}

//SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}

//SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notiElement.style.display = "block";
    notiElement.innerHTML = `<p> ${error.message} </p>`
}

//API KEY 
const key = "b481774b929cc87c9c4bd34519e58d6d";

//GET WEATHER FROM API PROVIDER
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

//DISPLAY WEATHER TO USER
function displayWeather(){
    iconElement.innerHTML = `<img src="Assets/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locaElement.innerHTML = `${weather.city}, ${weather.country}`;
}        