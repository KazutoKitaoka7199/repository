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
// let num = 90;

const f =() => {
    if(numRandom >= 80){
        console.log(dai);
    }else if(numRandom >= 60){
        console.log(tyu);
    }else{
        console.log(syou);
    };
};
let numRandom = Math.floor(Math.random()*100+1);
console.log(numRandom);
f();
