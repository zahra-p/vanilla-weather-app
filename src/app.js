function displayTemperature(response){
    console.log(response.data);
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let speedElement=document.querySelector("#speed");

    temperatureElement.innerHTML=Math.round(response.data.list[0].main.temp);
    cityElement.innerHTML=response.data.list[0].name;
    descriptionElement.innerHTML=response.data.list[0].weather[0].description;
    humidityElement.innerHTML=response.data.list[0].main.humidity;
    speedElement.innerHTML=Math.round(response.data.list[0].wind.speed);
}


let apiKey="8c78e9e7e9928cd1a2a6f923072c3dec";

let apiUrl=
`https://api.openweathermap.org/data/2.5/find?q=London&appid=${apiKey}&units=metric`;


console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);