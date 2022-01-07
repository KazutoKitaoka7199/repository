let YOUR_ACCESS_KEY = "iWsuU79G1a04z9F0EYxuaGDUENuveGcg3nIXcAZY_jU";
let endpoint = `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}`;

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
