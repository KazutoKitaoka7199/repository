const drawCanvas_W = 384*2;
const drawCanvas_H = 384;

let drawCan = document.getElementById("drawCanvas");
let drawCon = drawCan.getContext("2d");

drawCan.width = drawCanvas_W;
drawCan.height = drawCanvas_H;

function drawCanvas(){

    drawCon.fillStyle = "white";
    drawCon.fillRect(0,0,drawCanvas_W,drawCanvas_H);

    document.getElementById("input").addEventListener("change",function(){
        const reader = new FileReader();
        reader.addEventListener("load", function(){
            // console.log(reader.result);
            localStorage.setItem("recent-image",reader.result);
        });
        reader.readAsDataURL(this.files[0]); 
    });
}
drawCanvas();
    
let pasteCan = document.getElementById("drawCanvas");
let pasteCon = pasteCan.getContext("2d");
// 画像をcanvasに張り付け
// 画像読み込み
const chara = new Image();
document.addEventListener("DOMContentLoaded", function(){
    const recentImagedataURL = localStorage.getItem("recent-image");
    if(recentImagedataURL){
        chara.src = recentImagedataURL;  // 画像のURLを指定
        chara.onload = function(){
        pasteCon.drawImage(chara, 0, 0);
        }
    };
});

let mouse = {
    x:0,
    y:0
};

drawCan.addEventListener("mousemove",(e) => {

    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    // console.log(mouse);
},false);

drawCan.addEventListener("mousedown",(e) => {
    drawCon.beginPath();
    drawCon.moveTo(mouse.x, mouse.y);

    drawCan.addEventListener("mousemove", onPaint, false);
}, false);

drawCan.addEventListener("mouseup", ()=> {
    drawCan.removeEventListener("mousemove",onPaint,false);
});

function clickBtn1(){
    let stroke_style = document.getElementById("colorBox");
    selectColor = stroke_style.value;
}

function clickBtn2() {
    const number = document.getElementById("number");
    selectWidth = number.value;
}

const onPaint = () => {
    drawCon.lineTo(mouse.x,mouse.y);
    drawCon.stroke();
    drawCon.strokeStyle = selectColor;
    drawCon.lineWidth = selectWidth;
}

// //描画内容を画像で保存
// const dataURI = drawCan.toDataURL() ;

// 描画クリア
document.getElementById("clear").addEventListener("click",function () {
    drawCon.clearRect(0, 0, drawCanvas_W, drawCanvas_H);
    drawCanvas();
    const recentImagedataURL = localStorage.getItem("recent-image");
    if(recentImagedataURL){
        chara.src = recentImagedataURL;  // 画像のURLを指定
        chara.onload = function(){
        pasteCon.drawImage(chara, 0, 0);
        }
    };
});

//その他やりたかったこと
//ローカルストレージ内のデータを削除する。
//ローカルストレージに画像を沢山保存しておいて、その中から作業の続きをしたい画像を選択する
//画像のプレビューを見ながら、保存している画像を選択できる
//pdfをアップロードできるようにする


