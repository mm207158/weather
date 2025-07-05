let weatherList = [];

// Arrays of day and month names
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let humidity;
let windSpeed;
let windDir;
let ci;
let condition;
let ic;
let searchInput = document.getElementById("searchInput");

async function getData(city) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`
    );
    if (response.ok) {
      let data = await response.json();
      ci = data.location.name;
      condition = data.current.condition.text;
      ic = data.current.condition.icon;
      humidity = data.current.humidity;
      windSpeed = data.current.wind_kph;
      windDir = data.current.wind_dir;

      weatherList = data.forecast.forecastday;
      display();
    }
  } catch (error) {
    console.log(error);
  }
}

function display() {
  let box = "";

  for (let i = 0; i < weatherList.length; i++) {
    let date = new Date(weatherList[i].date);
    let dayName = days[date.getDay()];
    let monthName = months[date.getMonth()];
    let maxTemp = weatherList[i].day.maxtemp_c;
   
    box += `
      <div class="col-md-4 toda text-centery" id="thisDay">
        <div class="card todaycard p-4" style="width: 18rem;">
          <div class="card-header d-flex justify-content-between w-100 ">
            <p>${dayName}</p>
            <p>${i===0? monthName:""}</p>
          </div>
          <div class="card-body">
            <p id="location">${i === 0 ? ci : ""}</p>
            <h1 style="font-size: 50px;">${maxTemp}c</h1>
            <img src="${ic}" alt="">
            <p class="con">${condition}</p>
<<<<<<< HEAD
          ${i===0?`<i class="fa-solid fa-umbrella-beach" style="color: #B197FC;"></i>`:""}  
=======
          ${i===0?`<i class="fa-solid fa-umbrella-beach" style="color:rgb(168, 144, 239);"></i>`:""}  
>>>>>>> 969281e (first commit)
            <span>${i===0? humidity:""}${i===0?"%":""}</span>
          ${i === 0 ? `<i class="fa-solid fa-wind" style="color: #B197FC;"></i>` : ""}

            <span>${i===0?windSpeed :""}${i===0?"km/h":""} </span>
           ${i===0?` <i class="fa-regular fa-compass" style="color: #B197FC;"></i>`:""}
            <span>${i===0?windDir:""}</span>
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById("rowData").innerHTML = box;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  console.log("Geolocation not supported.");
}

function showPosition(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;

  let url = `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${lat},${lon}&days=3`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city = data.location.name;
      getData(city); // ← استدعاء مباشر بعد معرفة المدينة
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showError(error) {
  console.log("Location access denied or failed.");
}

searchInput.addEventListener("input", function () {
  let term = searchInput.value;
  getData(term);
});
