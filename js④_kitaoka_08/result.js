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