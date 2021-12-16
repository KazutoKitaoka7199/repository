const screen_W = 384; //マリオが走っているキャンバスの横幅
const screen_H = 80; //マリオが走っているキャンバスの縦幅
const GAME_FPS = 1000/60; //FPS

//仮想のキャンバスを作成（マリオを2倍に描画するために、先ず仮想のキャンバスで元サイズで描画し、そのあとキャンバスに2倍に拡大して描画する）
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width = screen_W;
vcan.height = screen_H;

can.width = screen_W*2;
can.height = screen_H*2;

//拡大したときにぼやけるのを防ぐおまじないたち
con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

//フレームレート維持
let frameCount = 0;
let startTime = 0;

//新しいオブジェクトを作成
let chImage = new Image();
chImage.src = "../js②_kitaoka_08/sprite.png";

//描画処理
function draw(){
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0,0,screen_W,screen_H);
    vcon.drawImage(chImage,0,192,32,32,0,10,32,32);
    //デバック情報
    // vcon.font="10px sarif";
    // vcon.fillStyle="white";
    // vcon.fillText("FRAME:"+frameCount, 10,10);

    // 仮想キャンバスから拡大して転送
    con.drawImage(vcan,0,0,screen_W,screen_H,0,0,screen_W*2,screen_H*2);
};  

//ブラウザ立ち上げ時のタイムスタンプ取得
window.onload = function(){
    startTime = performance.now();
    mainLoop();
}
//メインループ
function mainLoop(){
    let nowTime = performance.now();
    let nowFrame = (nowTime-startTime)/GAME_FPS;
    if(nowFrame > frameCount){
        frameCount++;
    }
    draw();
    requestAnimationFrame(mainLoop);
}