// day & time

function formatDate (date) {

  let hours = date.getHours ();
  if (hours < 10) {
    hours = `0${hours}`
  }

  let minutes = date.getMinutes ();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  let days = date.getDay ();
  let dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = dayName[days];

  return `${day} ${hours}:${minutes}`;
}

let dayTime = document.querySelector ("#day-time");
let currentTime = new Date ();
dayTime.innerHTML = formatDate (currentTime);

//Search

function displayTemperature (response) {
  document.querySelector ("#city-name").innerHTML = response.data.name;
  document.querySelector ("#current-temperature").innerHTML = Math.round (response.data.main.temp);
  document.querySelector ("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round (response.data.wind.speed);
}

function searchCity (city) {
let apiKey = "cccb60e2b71b1ece226b8d97365fb946";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get (apiUrl).then (displayTemperature);
}

function searchSubmit (event) {
  event.preventDefault ();

  let city = document.querySelector ("#search-input").value;
  searchCity (city);
}

let searchForm = document.querySelector ("#search"); 
searchForm.addEventListener ("submit", searchSubmit);

// Current Location

function searchLocation (position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "cccb60e2b71b1ece226b8d97365fb946";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get (apiUrl).then (displayTemperature);
}

function getLocation (event) {
  event.preventDefault ();
  navigator.geolocation.getCurrentPosition (searchLocation);
}

let locationButton = document.querySelector ("#current-button");
locationButton.addEventListener ("click", getLocation);

// Default City

searchCity ("London");