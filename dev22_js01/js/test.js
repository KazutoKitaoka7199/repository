// ここからコードを書きます🤗
// alert(111);
// console.log("初めてのJS");
// console.log(23+5);
// console.log(2000-1800);
// console.log("18+5");

// const myName = "北岡和人";
// const oohori = "おおほり";

// console.log(myName);
// console.log(oohori);

const dai = "大吉"
const tyu = "中吉"
const syou = "小吉"


const f =() => {
    let numRandom = Math.floor(Math.random()*100+1);
    console.log(numRandom);
    if(numRandom >= 70){
        $("h1").html("大吉");
        $("h1").css("color","red");
        console.log(dai);
    }else if(numRandom >= 50){
        $("h1").html("中吉");
        $("h1").css("color","blue");
        console.log(tyu);
    }else{
        $("h1").html("小吉");
        $("h1").css("color","orange");
        console.log(syou);
    };
};

$("#aa").on("click", ()=>{
    f();    
});