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

    const input = document.querySelector(".search-bar");
    const li = document.createElement("li");
    li.innerText = input.value;
    li.classList.add("li");
    ul.appendChild(li);