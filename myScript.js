const places = document.getElementById("places");
var container = document.getElementById("container");
const d = new Date();
const yr = d.getFullYear();
const dd = d.getDate();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day = days[d.getDay()];
const mm = months[d.getMonth()];
console.log(dd);

document.getElementById("day").innerText = dd;
document.getElementById("dayname").innerHTML = day;
document.getElementById("month").innerHTML = mm + ",";
document.getElementById("year").innerHTML = yr;

function myfunc1() {
  const mydropdown = document.getElementById("mydropdown");
  mydropdown.classList.toggle("show");
}

function myfunc() {
  let mydropdown2 = document.getElementById("mydropdown2");
  mydropdown2.classList.toggle("show");
}

(async function Load() {
  const cityname = await fetch(
    "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json "
  ).then((response) => response.json());
  // console.log(cityname);
  let dropdiv = document.createElement("div");
  dropdiv.setAttribute("id", "mydropdown2");
  for (let i = 0; i < cityname.city.length; i++) {
    let dropitem = document.createElement("div");
    dropitem.setAttribute("class", "placenames");
    dropitem.innerText = cityname.city[i].name;
    dropdiv.appendChild(dropitem);
  }
  places.appendChild(dropdiv);
  dropdiv.classList.add("dropdowncontent");
  dropdiv.classList.add("dropadd");

  //   cards api
  const card = await fetch(
    "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/make-your-trip-package.json"
  ).then((carddata) => carddata.json());
  // console.log(card);

  for (let i = 0; i < card.length; i++) {
    // console.log(card);
    const carddatas = document.createElement("div");
    carddatas.setAttribute("id", "card");
    carddatas.innerHTML = `<i class="fa fa-bookmark-o" id="bookmarks" style="font-size: 25px"></i>
        <div id="placename">
          <div id="left">
            <p id="dropdown">${card[i].cityName}</p>
            <p>${card[i].tourDate}</p>
            <p id="silverfont">${card[i].category}</p>
          </div>
        </div>

        <div id="cardtemp">
          <p>Average temprature</p>
          <div id="line"></div>
        </div>

        <div id="tempinc">
          + ${card[i].temp}&deg C
          <i class="fa fa-sun-o" style="font-size: 18px; color: orange"></i>
        </div>

        <img src=${card[i].cityImg} alt="placephoto" />
        <div id="bottom">
          <div id="price">
            <p id="silverfont">Total Price</p>
            <p id="dropdown">${card[i].price}</p>
          </div>
          <button>Explore</button>`;
    container.appendChild(carddatas);
  }
})();

window.onclick = function (e) {
  if (e.target.classList == "placenames") {
    console.log(e.target.innerText);
    fetching(e.target.innerText);

    const par = e.target.parentElement.parentElement.childNodes;
    par[3].innerText = e.target.innerText;

    if (e.target.parentElement.classList.contains("show") == true) {
      e.target.parentElement.classList.remove("show");
    }
  }
  if (!e.target.matches(".dropbtn")) {
    let dr = document.getElementsByClassName("dropdowncontent");
    console.log(dr);
    let dr1 = document.getElementsByClassName("dropdowncontent1");
    for (let i = 0; i < dr.length; i++) {
      if (dr[i].classList.contains("show")) {
        dr[i].classList.remove("show");
      }
    }
    for (let i = 0; i < dr1.length; i++) {
      if (dr1[i].classList.contains("show")) {
        dr1[i].classList.remove("show");
      }
    }
  }
};

async function fetching(cityname) {
  console.log(cityname);
  let url2 = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityname}.json?access_token=pk.eyJ1Ijoic2h1YmhhbWhpcmFuaTQ1IiwiYSI6ImNreTN3OHBiaTA2OXoyd3E5YjJ2b2xicWkifQ.hQfD_1Mmlpta37azNXVyvQ`
  );
  let data2 = await url2.json();
  // console.log(data2);

  let longitude = data2.features[0].center[0];
  let latitude = data2.features[0].center[1];
  // console.log(longitude + " " + latitude);

  let url3 = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&units=metric&appid=d57f8c3baf6bb12c1c6f23e9e1315929`
  );
  let data3 = await url3.json();
  // console.log(data3.current.weather[0].main);
  // console.log(data3.current.temp);

  document.getElementById(
    "temprature"
  ).innerHTML = `${data3.current.temp}&#176;`;
  document.getElementById("city").innerText = cityname;

  // }
}
