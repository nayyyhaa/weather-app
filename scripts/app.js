//Declaring variables
const locationTimezone = document.querySelector(".location-timezone");
const iconElement = document.querySelector(".icon");
const temperatureDegree = document.querySelector(".temperature-degree");
const teperatureDescription = document.querySelector(".temperature-description");
const humidityElement = document.querySelector(".humidity");

//adding event listeners
document.addEventListener("DOMContentLoaded",() => {
    let lat;
    let lon;
    let apiKey="2dcd69748f6a6190f00b81d582e92323";
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
        const tempCelcius = (temp - 273.15);
        locationTimezone.innerHTML = timezone;
        temperatureDegree.innerHTML = `${tempCelcius}°C`;
        teperatureDescription.innerHTML = description;
        humidityElement.innerHTML = `Humidity: ${humidity}`;
        iconDefine(icon);
    //     document.body.style.backgroundImage =
    //   "url('https://source.unsplash.com/1600x900/?" + name + "')";
    })
}