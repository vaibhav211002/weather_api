//state
let currcity="delhi";
let units="metric";


//selectors
let city=document.querySelector(".weather__city");
let datetime=document.querySelector(".weather__datetime");
let weather__forecast=document.querySelector(".weather__forecast");
let weather__temperture=document.querySelector(".weather__temperature");
let weather__icon=document.querySelector(".weather__icon");
let weather__minmax=document.querySelector(".weather__minmax");
let weather__realfeel=document.querySelector(".weather__realfeel");
let weather__humidity=document.querySelector(".weather__humidity");
let weather__wind=document.querySelector(".weather__wind");
let weather__pressure=document.querySelector(".weather__pressure");
let card=document.querySelector(".weather__unit_celsius");
let card2=document.querySelector(".weather__unit_farenheit");

//search
document.querySelector(".weather__search").addEventListener('submit',e=>{
   let search=document.querySelector(".weather__searchform");
   //prevent deafault action
   e.preventDefault();
   //change curreet
   currcity=search.value;
   getweather();
})




//units
document.querySelector(".weather__unit_celsius").addEventListener('click',()=>{
   if(units!="metric"){
      units="metric";
      getweather();
   }
})

document.querySelector(".weather__unit_farenheit").addEventListener('click',()=>{
   if(units!="imperial"){
      units="imperial";
      getweather();
   }
})

//convert time

function convertTime(timestamp,timezone){
   //const convertTimezone=timezone/3600;
   const date = new Date((timestamp+timezone-19210)*1000);

   const options ={
      weekday:"long",
      day:"numeric",
      month:"long",
      year:"numeric",
      hour:"numeric",
      minute:"numeric",
      timeZone:"Asia/Kolkata",
      hour12:true,
   }
   return date.toLocaleString("en-US",options)
}



//CONVERT COUNTRY CODE TO NAME

function convertcode(country){
   let regionNames=new Intl.DisplayNames(["en"],{type:"region"});
   return regionNames.of(country);
}










function getweather(){
   const api_key='22ac474eb139d12b5ff5b4482c73aa8e';
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currcity}&appid=${api_key}&units=${units}`).then(res=>res.json()).then(data=>{
      city.innerHTML=`${data.name}, ${convertcode(data.sys.country)}`
      datetime.innerHTML=convertTime(data.dt,data.timezone);
      weather__forecast.innerHTML=`<p>${data.weather[0].main}`;
      weather__temperture.innerHTML=`${data.main.temp}&#176`;
      weather__icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`;
      //console.log(data.main.temp_min);
      weather__minmax.innerHTML=`<p>Min: ${data.main.temp_min}&#176</p><p>Max: ${data.main.temp_max}&#176</p>`;
      weather__realfeel.innerHTML=`${data.main.feels_like}&#176`;
      weather__humidity.innerHTML=`${data.main.humidity}%`;
      weather__pressure.innerHTML=`${data.main.pressure} hPa`;
      weather__wind.innerHTML=`${data.wind.speed}${units==="imperial"?" mph":" m/s"}`;

      //open the console window to see the response of the Api.
      console.log(data);
   });

}

document.body.addEventListener('load',getweather());
