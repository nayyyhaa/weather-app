//Declaring variables
const locationTimezone = document.querySelector(".location-timezone");
const iconElement = document.querySelector(".icon");
const temperatureDegree = document.querySelector(".temperature-degree");
const teperatureDescription = document.querySelector(".temperature-description");
const humidityElement = document.querySelector(".humidity");
const searchButton = document.querySelector(".search-button");
const searchbar = document.querySelector(".search-bar");

let apiKey="2dcd69748f6a6190f00b81d582e92323";

//adding event listeners
document.addEventListener("DOMContentLoaded",() => {
    let lat;
    let lon;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            const apiURL=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            getTemperature(apiURL);
        })
    } else {
        console.log('eh')
    }
})

searchbar.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      search();
    }
});

searchButton.addEventListener("click", () => {
    search();
})

function search() {
    let city =searchbar.value;
    let URL="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const {name} = data;
        const {temp, humidity} = data.main;
        const {main , icon } = data.weather[0];
        locationTimezone.innerHTML = name;
        temperatureDegree.innerHTML = `${temp}°C`;
        teperatureDescription.innerHTML = main;
        humidityElement.innerHTML = `Humidity: ${humidity}%`;
        iconDefine(icon);
        searchbar.value="";
    })
}

function iconDefine(icon){
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    iconElement.src = iconurl;
}


function getTemperature(apiURL){
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const {timezone} = data;
        const {temp, humidity} = data.current;
        const {description , icon } = data.current.weather[0];
        const tempCelcius = Math.round(temp - 273.15);
        locationTimezone.innerHTML = timezone;
        temperatureDegree.innerHTML = `${tempCelcius}°C`;
        teperatureDescription.innerHTML = description;
        humidityElement.innerHTML = `Humidity: ${humidity}%`;
        iconDefine(icon);
        
    //     document.body.style.backgroundImage =
    //   "url('https://source.unsplash.com/1600x900/?" + name + "')";
    })
}

