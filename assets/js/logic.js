// WEATHER APP
// querySelector returns the first element with the class. Since we only have the one class this works. 
   // if using ID's || using more than one (card for instance) need to update DOM elements
   const weatherForm = document.querySelector(".weatherForm");
   const cityInput = document.querySelector(".cityInput");
   const card = document.querySelector(".card");
   const apiKey = "";
   
   
   
   weatherForm.addEventListener("submit", async event => {
     //prevents page refresh
     event.preventDefault();
   
     const city = cityInput.value;
   
       if(city){//if there is a value this will be true 
   
           try{
               //wait for the function to return the weather data
               const weatherData = await getWeatherData(city);
               //once we recieve the data call the displayWeatherInfo function and pass along the weather data
               displayWeatherInfo(weatherData);
           }
   
           catch(error){
   
               console.error(error);
   
               displayError(error);
           }
       }
   
       else{//If no value pass on an error message
   
           displayError("Please enter a city");
   
       }
   });
   
   
   
   async function getWeatherData(city){
      //The url will be passed to the fetch function
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      //wait for response
      const response = await fetch(apiUrl);
   
       if(!response.ok){//if response Not okay throw error 
   
           throw new Error("Could not fetch weather data");
   
       }
      //if response okay convert response to json and return to event listener
      return await response.json();
   
   }
   
   
   
   function displayWeatherInfo(data){
       //object destructuring {}, once destructured we can use them as variables
       const {name: city, 
   
              main: {temp, humidity}, 
              //array destructuring followed by object destructuring
              weather: [{description, id}]} = data;
       //if text already exists the empty string will reset it 
       card.textContent = "";
   
       card.style.display = "flex";
   
   
       //create elements
       const cityDisplay = document.createElement("h1");
   
       const tempDisplay = document.createElement("p");
   
       const humidityDisplay = document.createElement("p");
       //description 
       const descDisplay = document.createElement("p");
   
       const weatherEmoji = document.createElement("p");
   
       
       //set text contenet of created elements
       cityDisplay.textContent = city;
       //convert Kelvin temperature to Ferenheit and set text content
       tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
   
       humidityDisplay.textContent = `Humidity: ${humidity}%`;
   
       descDisplay.textContent = description;
       //call the getWeatherEmoji function with the id variable passed in
       weatherEmoji.textContent = getWeatherEmoji(id);
   
   
       //Add CSS class to elements
       cityDisplay.classList.add("cityDisplay");
   
       tempDisplay.classList.add("tempDisplay");
   
       humidityDisplay.classList.add("humidityDisplay");
   
       descDisplay.classList.add("descDisplay");
   
       weatherEmoji.classList.add("weatherEmoji");
   
   
   
       card.appendChild(cityDisplay);
   
       card.appendChild(tempDisplay);
   
       card.appendChild(humidityDisplay);
   
       card.appendChild(descDisplay);
   
       card.appendChild(weatherEmoji);
   
   }
   
   
   
   function getWeatherEmoji(weatherId){
   
       switch(true){// weather condition codes to set emoji
   
           case (weatherId >= 200 && weatherId < 300):
   
               return "⛈";//thunderstorm
   
           case (weatherId >= 300 && weatherId < 400):
   
               return "🌧";//drizzle (light rain)
   
           case (weatherId >= 500 && weatherId < 600):
   
               return "🌧";//rain (heavier)
   
           case (weatherId >= 600 && weatherId < 700):
   
               return "❄";//snow
   
           case (weatherId >= 700 && weatherId < 800):
   
               return "🌫";//Fog 
   
           case (weatherId === 800):
   
               return "☀";//clear sky
   
           case (weatherId >= 801 && weatherId < 810):
   
               return "☁";//clouds
   
           default://default, if weather code is unknown
   
               return "❓";
   
       }
   }
   
   
   
   function displayError(message){
   
       const errorDisplay = document.createElement("p");
   
       errorDisplay.textContent = message;
   
       errorDisplay.classList.add("errorDisplay");
   
   
   
       card.textContent = "";
       //display is set to none the flex property will display the card with the error message
       card.style.display = "flex";
   
       card.appendChild(errorDisplay);
   
   }