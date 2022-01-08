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
    const li = document.createElement("li");
    li.innerText = input.value;
    li.classList.add("li");
    ul.appendChild(li);
    input.value = "";
}