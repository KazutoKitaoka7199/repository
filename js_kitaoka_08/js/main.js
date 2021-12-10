

let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");


//フレームレート維持
let frameCount = 0;
let startTime = 0;

let chImage = new Image();
chImage.src = "../js_kitaoka_08/sprite.png";

//キーボード
let keyBord = {
    Left:false,
    Right:false,
    Up:false,
    Down:false,
    // scr_x:0,
};

//マリオ
let Mario = new mario(50,160)

//フィールド
let field = new Field();

vcan.width = screen_W;
vcan.height = screen_H;

can.width = screen_W*3.5;
can.height = screen_H*3.5;

con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

//更新処理
function update(){
    field.update();
    Mario.update();
};

//マリオご本人描画の関数
function drawSprite(number, x, y){
    let sx = (number % 16)*16;
    let sy = (number >> 4)*16;
    vcon.drawImage(chImage, sx,sy,16,32, x, y,16,32);
}

//描画処理
function draw(){
    //画面を水色でクリア
    vcon.fillStyle = "#66AAFF";     //fillStyle:図形の内側を塗りつぶすために使用する色、グラデーション、またはパターンを指定
    vcon.fillRect(0,0,screen_W,screen_H);   //fillRect:四角を描画するメソッド
    
    //マップ描画
    field.draw();

    //マリオご本人描画
    Mario.draw();
    
    vcon.font="10px sarif";
    vcon.fillStyle="white";
    vcon.fillText("FRAME:"+frameCount, 10,20);

    //仮想画面から実画面へ拡大転送
    con.drawImage(vcan, 0,0,screen_W,screen_H, 0,0,screen_W*3.5,screen_H*3.5);
    
};

// setInterval(mainLoop, 1000/60);
//ループ開始
window.onload = function(){
    startTime = performance.now();  //ブラウザを起動してからどれくらいの時間が経ったのか（ミリ秒）
    mainLoop();
};
//メインループ
function mainLoop(){
    
    let nowTime = performance.now();  //関数実行時のタイムスタンプ（ミリ秒）
    let nowFrame = (nowTime-startTime)/game_fps; //毎秒６０フレーム
    if(nowFrame > frameCount){  //
        let c = 0;
        while(nowFrame > frameCount){
            frameCount++;
            // console.log(frameCount);
            //更新処理
            update();
            if(++c>=4)break;
        };
        //描画処理
        draw();
    };
    requestAnimationFrame(mainLoop);
};

//移動させる処理
document.onkeydown = function(e){
    if(e.key === "ArrowLeft"){
        keyBord.Left = true;
    };
    if(e.key === "ArrowRight"){
        keyBord.Right = true;
    };
    if(e.key === "x"){
        keyBord.Up = true;
    };
    if(e.key === "z"){
        keyBord.Down = true;
    };
    if(e.key === "a"){
        field.scx-=3;
        console.log(field.scx);
    }
    if(e.key === "s"){
        field.scx+=3;
        console.log(field.scx);
    }
};

//移動を止める処理
document.onkeyup = function(e){
    if(e.key === "ArrowLeft")keyBord.Left = false;
    if(e.key === "ArrowRight")keyBord.Right = false;
    if(e.key === "x")keyBord.Up = false;
    if(e.key === "z")keyBord.Down = false;
};

// //移動させる処理(非推奨)
// document.onkeydown = function(e){
//     if(e.keyCode == 37)keyBord.Left = true;
//     if(e.keyCode == 39)keyBord.Right = true;
// };

// //移動を止める処理（非推奨）
// document.onkeyup = function(e){
//     if(e.keyCode == 37)keyBord.Left = false;
//     if(e.keyCode == 39)keyBord.Right = false;
// };
