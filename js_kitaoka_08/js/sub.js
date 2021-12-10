
const game_fps = 1000/60;
const screen_W = 256;
const screen_H = 224;

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
};

//移動座標
let mario_x = 100<<4; //4ビットシフトする（１６倍）
let mario_y = 100<<4;
let mario_vx = 0;
let mario_vy = 0;

//ジャンプ移動
let mario_jump = 0;

const GRAVITY = 4;

let mario_animation = 0;
const jumpAnimetion = 3;
let mario_sprite = 0;
let mario_sprite_count = 0;
let mario_direction = 0;

vcan.width = screen_W;
vcan.height = screen_H;

can.width = screen_W*2.5;
can.height = screen_H*2.5;

con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

//更新処理
function update(){
    //アニメーション用のカウンタ
    mario_sprite_count++;
    if(Math.abs(mario_vx)==32)mario_sprite_count++;

    //ジャンプ動作の処理
    if(keyBord.Up){
        if(mario_jump == 0){
            mario_animation = jumpAnimetion;
            mario_jump = 1;
            mario_vy = -64;
        }
        if(mario_jump<15)mario_vy = -(64-mario_jump);
    };
    if(mario_jump)mario_jump++;

    //重力
    if(mario_vy<64)mario_vy+=GRAVITY;
    console.log(mario_vy);
    //地面に着地する処理
    if(mario_y>100<<4){
        if(mario_animation==jumpAnimetion)mario_animation=1;
        mario_jump = 0;
        mario_vy = 0;
        mario_y = 100<<4;
    };

    //移動処理・アニメーションの指定
    if(keyBord.Left){
        if(mario_animation==0)mario_sprite_count=0;
        if(!mario_jump)mario_animation = 1;
        if(!mario_jump)mario_direction = 1;
        if(mario_vx>-32)mario_vx-=1;
        console.log(mario_vx);
        if(!mario_jump && mario_vx>8)mario_animation=2;
    }else if(keyBord.Right){
        if(mario_animation==0)mario_sprite_count=0;
        if(!mario_jump)mario_animation = 1;
        if(!mario_jump)mario_direction = 0;
        console.log(mario_vx);
        if(mario_vx<32)mario_vx+=1;
        if(!mario_jump && mario_vx<-8)mario_animation=2;
    }else {
        if(!mario_jump){
            if(mario_vx>0)mario_vx-=1;
            if(mario_vx<0)mario_vx+=1;
            if(!mario_vx)mario_animation = 0;
        }
    };

    
    //停止状態・走らせる・急ブレーキ（スプライトの決定）
    if(mario_animation == 0)mario_sprite = 0;
    else if(mario_animation ==1)mario_sprite = 2 + ((mario_sprite_count>>2)%3);
    if(mario_animation == 2)mario_sprite = 5;
    if(mario_animation == jumpAnimetion)mario_sprite = 6;
    
    //左向きに切り替え
    if(mario_direction == 1)mario_sprite +=48;

    //マリオが移動する処理（座標移動）
    mario_x += mario_vx;
    mario_y += mario_vy;
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
    
    //マリオご本人描画
    drawSprite(mario_sprite, mario_x>>4, mario_y>>4);
    
    vcon.font="24px sarif";
    vcon.fillStyle="white";
    vcon.fillText("FRAME:"+frameCount, 20,20);

    //仮想画面から実画面へ拡大転送
    con.drawImage(vcan, 0,0,screen_W,screen_H, 0,0,screen_W*2.5,screen_H*2.5);
    
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
