const YOUR_ACCESS_KEY = "iWsuU79G1a04z9F0EYxuaGDUENuveGcg3nIXcAZY_jU";
const endpoint = `https://api.unsplash.com/photos/random?client_id=${YOUR_ACCESS_KEY}`;

const imageElement = document.querySelector("#unsplashImage");
const imageLink = document.querySelector("#imageLink");

//unsplashAPIのjsonデータを取得・表示する処理
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

//openweatherAPIのjsonデータを取得・表示する処理
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
                // console.log(name,icon,description,temp,humidity,speed);
                document.querySelector(".city").innerText = "Weather in " + name;
                document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
                document.querySelector(".description").innerText = description;
                document.querySelector(".temp").innerText = temp +"°C";
                document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
                document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
                document.querySelector(".weather").classList.remove("loading");
        })
    },
    search: function(){
        this.fetchweather(document.querySelector(".search-bar").value);
    }
};

//検索ボタンをクリックすると、検索バーに入力した都市の天気が表示される処理
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
    aftersearch();
    
})
//検索バーに入力後Enterキーを押すと入力した都市の天気が表示される処理
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
        aftersearch();
    }
})

function aftersearch(){
    const input = document.querySelector(".search-bar");
    input.value = "";
}

//デフォルトの都市を表示
weather.fetchweather("Tokyo");

const results = JSON.parse(localStorage.getItem("results"));

if(results){
    results.forEach(result => {
        add(result);        
    });
}

function add(){
    const input = document.querySelector(".search-bar");
    const li = document.createElement("li");
    li.innerText = input.value;
    li.classList.add("li");
    ul.appendChild(li);
}
