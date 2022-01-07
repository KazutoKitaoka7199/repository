let YOUR_ACCESS_KEY = "iWsuU79G1a04z9F0EYxuaGDUENuveGcg3nIXcAZY_jU";
let endpoint = `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}`;

let weather = {
    "API_KEY": "7fdddc19aef6824dd784a69c3e714777",
    fetchweather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + this.API_KEY
         )
        .then(function(responce){
            return responce.json();
        })
        .then(function(jsonData){
                const { name } = jsonData;
                const { icon, description } = jsonData.weather[0];
                const { temp, humidity } = jsonData.main;
                const { speed } = jsonData.wind;
                console.log(name,icon,description,temp,humidity,speed);
                document.querySelector(".city").innerText = "Weather in " + name;
                document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
                document.querySelector(".description").innerText = description;
                document.querySelector(".temp").innerText = temp +"°C";
                document.querySelector(".humidity").innerText = "humidity: " + humidity + "%";
                document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        })
    }, 
}



let imageElement = document.querySelector("#unsplashImage");
let imageLink = document.querySelector("#imageLink");

fetch(endpoint)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        // console.log(jsonData);
        imageElement.src = jsonData.urls.regular;
        // console.log(jsonData.urls.full);
        imageLink.setAttribute("href", jsonData.links.html);
    })
    .catch(function(error){
        console.log("Error:" + error);
    });

