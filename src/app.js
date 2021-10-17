
function formatDate(timestamp){  //میلی ثانیه میگیره
    let date = new Date(timestamp);
    let hours= date.getHours();
    if (hours < 10){
        hours= `0{hours}`;
    }

    let minutes=date.getMinutes();
    if (minutes < 10){
        minutes= `0{minutes}`;
    }
    
    let days=["Saturday","Monday","Tuesday","Wednesday","Thursday","Friday"];
    let day=days[date.getDay()];

    return `${day} ${hours}:${minutes}`;

}

function displayTemperature(response){
  
    console.log(response.data);

    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let speedElement=document.querySelector("#speed");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");

    celsiusTemperature=response.data.list[0].main.temp

    temperatureElement.innerHTML=Math.round(response.data.list[0].main.temp);
    cityElement.innerHTML=response.data.list[0].name;
    descriptionElement.innerHTML=response.data.list[0].weather[0].description;
    humidityElement.innerHTML=response.data.list[0].main.humidity;
    speedElement.innerHTML=Math.round(response.data.list[0].wind.speed);
    dateElement.innerHTML=formatDate(response.data.list[0].dt * 1000);
    iconElement.innerHTML=`http://openweathermap.org/img/wn/10d@2x.png`;
    iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`)

    iconElement.setAttribute("alt", response.data.list[0].weather[0].description);
   
}

function search(city){
let apiKey="8c78e9e7e9928cd1a2a6f923072c3dec";
let apiUrl=
`https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);


}

function handleSubmit(event){
    event.preventDefault();
    
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    
    let  temperatureElement =document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature=( celsiusTemperature * 9 ) / 5 +32 ;
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let  temperatureElement =document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit)


let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);



let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


search("New York");