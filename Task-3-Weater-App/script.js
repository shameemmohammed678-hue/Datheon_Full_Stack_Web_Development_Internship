
let search_Button = document.getElementById("search-button")

let city = ""

let city_Input = document.getElementById("city-input")

let city_Name = document.getElementById("city_name")

let degree = document.getElementById("degree")

let climate = document.getElementById("climate")

let feels_like = document.getElementById("feels-like")

let high_temp = document.getElementById("h")

let low_temp = document.getElementById("l")

let weather_Icon = document.getElementById("weather-img")

search_Button.addEventListener("click",()=>{

     city = city_Input.value.trim()
     let errorMessage = document.getElementById("error-message");

     if (city===""){
        errorMessage.textContent = "Please Enter City"
        return
        
     }
     data_Fetch()
     city_Input.value = ""



})







function updateCityDateTime(timezoneOffset) {

    const now = new Date();
    const cityTime = new Date(
        now.getTime() +
        (timezoneOffset * 1000) -
        (now.getTimezoneOffset() * 60000)
    );

    document.getElementById("day").textContent =
        cityTime.toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "UTC"
        });

    document.getElementById("date").textContent =
        cityTime.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC"
        });

    document.getElementById("time").textContent =
        cityTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
        });
}



function convertTime(timestamp, timezoneOffset) {
    const date = new Date(timestamp * 1000);
    const cityTime = new Date(
        date.getTime() + timezoneOffset * 1000
    );

    return cityTime.toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}


async function data_Fetch(){

    let loading = document.getElementById("loading")
    let errorMessage = document.getElementById("error-message")
    loading.style.display = "block"
    errorMessage.textContent = ""

    try{
    let res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    let data = await res.json();

    if (!res.ok) {
    throw new Error(
        data.message || "City not found. Please check the spelling."
    );
}
    
    if(res.ok){
        city_Name.textContent = data.name+' , '+data.sys.country
        let temp  = parseInt(data.main.temp-273.15)
        let f_like = parseInt(data.main.feels_like-273.15)
        
        degree.textContent = `${temp}℃`
        climate.textContent = data.weather[0].description
        feels_like.textContent = `Feels Like ${f_like}℃`
        high_temp.textContent = `H: ${Math.round(data.main.temp_max-273.15)}℃`
        low_temp.textContent = `L: ${Math.round(data.main.temp_min-273.15)}℃`

        let iconCode = data.weather[0].icon
        let iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        let windSpeed = data.wind.speed*3.6

        weather_Icon.src = iconURL

        document.getElementById("humidity").textContent = `${data.main.humidity}%`
        document.getElementById("wind-speed").textContent = `${windSpeed.toFixed(1)} km/h`
        document.getElementById("pressure").textContent = `${data.main.pressure} hpa`
        document.getElementById("visibility").textContent = `${(data.visibility)/1000} Km`

        let sunriseTime = convertTime(data.sys.sunrise, data.timezone);
        let sunsetTime = convertTime(data.sys.sunset, data.timezone);

        
        document.getElementById("sunrise").textContent = sunriseTime;
        document.getElementById("sunset").textContent = sunsetTime;


        updateCityDateTime(data.timezone);
        console.log(data);
        

        // hourforecaast api call

        //hour card - 1
        let forecast_Res = await fetch(
    `/api/forecast?city=${encodeURIComponent(city)}`
);

        let forecast_Data = await forecast_Res.json();

        if (!forecast_Res.ok) {
            throw new Error(forecast_Data.error ||forecast_Data.message ||"Unable to fetch forecast data.");
        
    }

        displayFiveDayForecast(forecast_Data);

        let forecastTime1 = new Date(forecast_Data.list[0].dt_txt.replace(" ", "T") + "Z");

        document.getElementById("hour1-time").textContent =forecastTime1.toLocaleTimeString("en-US", {
                                                                                                  hour: "2-digit",
                                                                                                  minute: "2-digit",
                                                                                                  hour12: true,
                                                                                                  timeZone: "UTC"
                                                                                          });
        document.getElementById("h-forecast-img1").src = `https://openweathermap.org/img/wn/${forecast_Data.list[0].weather[0].icon}@2x.png`
        document.getElementById("hour1-climate").textContent = forecast_Data.list[0].weather[0].description
        document.getElementById("hour1-feels-like").textContent = `${forecast_Data.list[0].main.temp}℃`

        


        // hour card - 2
        let forecastTime2 = new Date(forecast_Data.list[1].dt_txt.replace(" ", "T") + "Z");

        document.getElementById("hour2-time").textContent =forecastTime2.toLocaleTimeString("en-US", {
                                                                                                  hour: "2-digit",
                                                                                                  minute: "2-digit",
                                                                                                  hour12: true,
                                                                                                  timeZone: "UTC"
                                                                                          });
        document.getElementById("h-forecast-img2").src = `https://openweathermap.org/img/wn/${forecast_Data.list[1].weather[0].icon}@2x.png`
        document.getElementById("hour2-climate").textContent = forecast_Data.list[1].weather[0].description
        document.getElementById("hour2-feels-like").textContent = `${forecast_Data.list[1].main.temp}℃`



        //hourcard - 3
        let forecastTime3 = new Date(forecast_Data.list[2].dt_txt.replace(" ", "T") + "Z");

        document.getElementById("hour3-time").textContent =forecastTime3.toLocaleTimeString("en-US", {
                                                                                                  hour: "2-digit",
                                                                                                  minute: "2-digit",
                                                                                                  hour12: true,
                                                                                                  timeZone: "UTC"
                                                                                          });
        document.getElementById("h-forecast-img3").src = `https://openweathermap.org/img/wn/${forecast_Data.list[2].weather[0].icon}@2x.png`
        document.getElementById("hour3-climate").textContent = forecast_Data.list[2].weather[0].description
        document.getElementById("hour3-feels-like").textContent = `${forecast_Data.list[2].main.temp}℃`





        //hourcard - 4
        let forecastTime4 = new Date(forecast_Data.list[3].dt_txt.replace(" ", "T") + "Z");

        document.getElementById("hour4-time").textContent =forecastTime4.toLocaleTimeString("en-US", {
                                                                                                  hour: "2-digit",
                                                                                                  minute: "2-digit",
                                                                                                  hour12: true,
                                                                                                  timeZone: "UTC"
                                                                                          });
        document.getElementById("h-forecast-img4").src = `https://openweathermap.org/img/wn/${forecast_Data.list[3].weather[0].icon}@2x.png`
        document.getElementById("hour4-climate").textContent = forecast_Data.list[3].weather[0].description
        document.getElementById("hour4-feels-like").textContent = `${forecast_Data.list[3].main.temp}℃`





         //hourcard - 5
        let forecastTime5 = new Date(forecast_Data.list[4].dt_txt.replace(" ", "T") + "Z");

        document.getElementById("hour5-time").textContent =forecastTime5.toLocaleTimeString("en-US", {
                                                                                                  hour: "2-digit",
                                                                                                  minute: "2-digit",
                                                                                                  hour12: true,
                                                                                                  timeZone: "UTC"
                                                                                          });
        document.getElementById("h-forecast-img5").src = `https://openweathermap.org/img/wn/${forecast_Data.list[4].weather[0].icon}@2x.png`
        document.getElementById("hour5-climate").textContent = forecast_Data.list[4].weather[0].description
        document.getElementById("hour5-feels-like").textContent = `${forecast_Data.list[4].main.temp}℃`

        

        
          //hourcard - 6
        let forecastTime6 = new Date(forecast_Data.list[5].dt_txt.replace(" ", "T") + "Z");

        document.getElementById("hour6-time").textContent =forecastTime6.toLocaleTimeString("en-US", {
                                                                                                  hour: "2-digit",
                                                                                                  minute: "2-digit",
                                                                                                  hour12: true,
                                                                                                  timeZone: "UTC"
                                                                                          });
        document.getElementById("h-forecast-img6").src = `https://openweathermap.org/img/wn/${forecast_Data.list[5].weather[0].icon}@2x.png`
        document.getElementById("hour6-climate").textContent = forecast_Data.list[5].weather[0].description
        document.getElementById("hour6-feels-like").textContent = `${forecast_Data.list[5].main.temp}℃`


        

     }
    }

    catch(error){
        errorMessage.textContent = error.message;
    }
    finally{
        loading.style.display = "none";
    }
    
    
}


function displayFiveDayForecast(forecast_Data) {
    const dailyForecast = {};

    forecast_Data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyForecast[date]) {
            dailyForecast[date] = [];
        }

        dailyForecast[date].push(item);
    });

    const dates = Object.keys(dailyForecast).slice(0, 5);

    dates.forEach((date, index) => {
        const dayNumber = index + 1;
        const items = dailyForecast[date];

        // Find the forecast closest to noon
        const representative = items.reduce((closest, item) => {
            const hour = Number(item.dt_txt.split(" ")[1].slice(0, 2));
            const closestHour = Number(
                closest.dt_txt.split(" ")[1].slice(0, 2)
            );

            return Math.abs(hour - 12) < Math.abs(closestHour - 12)
                ? item
                : closest;
        });

        const dayName = new Date(date + "T12:00:00Z")
            .toLocaleDateString("en-US", {
                weekday: "long",
                timeZone: "UTC"
            });

        document.getElementById(`day-name-${dayNumber}`).textContent =
            dayName;

        document.getElementById(`day-date-${dayNumber}`).textContent =
            new Date(date + "T12:00:00Z").toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                timeZone: "UTC"
            });

        document.getElementById(`day-img-${dayNumber}`).src =
            `https://openweathermap.org/img/wn/${representative.weather[0].icon}@2x.png`;

        document.getElementById(`day-climate-${dayNumber}`).textContent =
            representative.weather[0].description;

        document.getElementById(`day-temp-${dayNumber}`).textContent =
            `${Math.round(representative.main.temp)}°C`;
    });
}