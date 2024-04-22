"use strict";
const cityName = document.querySelector(".city");

const todayDate = document.querySelector(".date");

const todayTempurature = document.querySelectorAll(".todayTempurature");

const feelsLike = document.querySelector(".feelsLike");

const weatherDescription = document.querySelector(".weather");

const windSpeed = document.querySelector(".windSpeed");

const humidity = document.querySelector(".humidity");

const chooseCountry = async function () {
  try {
    const res = await axios.get("https://api.ipify.org/?format=json");
    const ip = res.data.ip;
    console.log(ip);

    const geoInfo = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=60219071be394c3d85cbd8df7146cd91&ip=${ip}`
    );

    const country = geoInfo.data.country_name;
    const city = geoInfo.data.city;

    const weatherData = await axios.get(
      `https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=18a0ade8d8a5449fad830cc1c104b1ad`
    );
    console.log(weatherData);

    const weather = weatherData.data.data[0];
    console.log(weather);

    const { city_name, datetime, temp, app_temp, wind_spd, rh } = weather;
    console.log(temp);

    //city
    cityName.innerHTML = city_name;
    //date
    todayDate.innerHTML = adjustDate(datetime);
    //tempurature
    for (const tempurature of todayTempurature) {
      tempurature.innerHTML = `${temp}&nbsp;&deg`;
    }
    // feels like
    feelsLike.innerHTML = `${app_temp}&nbsp;&deg`;

    // weather description
    weatherDescription.innerHTML = weather.weather.description;

    // wind speed
    windSpeed.innerHTML = `${wind_spd.toFixed(2)} (m/s)`;

    //humidity
    humidity.innerHTML = `${rh} %`;
  } catch (error) {
    console.log(error);
  }
};

chooseCountry();

// functions
function adjustDate(str) {
  return str.slice(0, str.length - 3);
}

function floorStr(num) {
  return Math.floor(num);
}
