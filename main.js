const container = document.querySelector(".container");

const errorBox = document.querySelector(".error");
const searchBox = document.querySelector(".search-box");

const temperature_F = document.querySelector(".temperature-in-F");
const temperature_C = document.querySelector(".temperature-in-C");

const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");

const cityName = document.querySelector(".location");
const weatherIcon = document.querySelector(".weather-icon");
const description = document.querySelector(".description");



// api key from https://openweathermap.org/api
const api_key = 'ba5a4ab3588aee249949a79cc6940103';

fetchData("new york");


// searching location 
searchBox.addEventListener("keypress", function(e){

    if(e.key == "Enter" && (searchBox.value).trim() != ''){
        fetchData(searchBox.value);
        searchBox.value = '';
    }
});


// fetching data
async function fetchData(location) {

    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${api_key}`);
        let data = await response.json();
        displayData(data);

        // hide error message
        if(errorBox.style.display == "inline"){
            errorBox.style.display = "none"
        }
    }
    catch(e){
        // use this to know the error
        // alert("Error: "+ e.message);

        // display error message
        errorBox.style.display = "inline";
    }
}


function displayData(data){
    // to understand data Format, visit: https://openweathermap.org/current#example_JSON

    addTemperature(data.main.temp);

    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;

    humidity.innerHTML = data.main.humidity + "<sub>%</sub>";
    windSpeed.innerHTML = Math.floor(data.wind.speed) + "<sub>km/h</sub>"

    let icon = data.weather[0].icon;
    let id = data.weather[0].id;
    displayIcon(icon);
    changeBackground(id,icon);
}


function addTemperature(temp){

    temperature_C.innerHTML = Math.floor(temp) + "<sup>°C</sup>";
    temperature_F.innerHTML = Math.floor((temp * 9/5) + 32) + "<sup>°F</sup>";
}

function displayIcon(icon){
    
    let nightIcons = ['01n', '02n', '10n'];

    if( nightIcons.includes(icon) ){
        weatherIcon.src = iconPath(icon);
    }
    else{
        weatherIcon.src = iconPath(icon.slice(0,-1));
    }
    // To understand icons, visit: https://openweathermap.org/weather-conditions#Icon-list
}

function changeBackground(id,icon){

    if(id == '800'){
        // if(icon == '01n'){
        //     container.style.backgroundImage = imagePath('night');
        // }
        // else{
        //     container.style.backgroundImage = imagePath('clear');
        // }

        container.style.backgroundImage = (icon == '01n') ? imagePath('night') : imagePath('day');
    }
    else{
        container.style.backgroundImage = imagePath(Math.floor(id/100));
    }
}


// for background and icon paths
const iconPath = (icon) => `assets/weather-icons/${icon}.png`;
const imagePath = (image) => `url(assets/background-images/${image}.png)`;