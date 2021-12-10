//ジャンプ移動
let ANIME_ATAND = 0;
let ANIME_WALK = 0;
let ANIME_BREAK = 0;
let ANIME_JUMP = 0;

const GRAVITY = 4;
const MAX_SPEED = 32;


class mario{
    constructor(x,y){
        this.x = x<<4;
        this.y = y<<4;
        this.vx = 0;
        this.vy = 0;
        this.mario_animation = 0;
        this.mario_sprite = 0;
        this.mario_sprite_count = 0;
        this.mario_direction = 0;
        this.mario_jump = 0;
    }

    //ジャンプ処理
    updateJump(){
        //ジャンプ動作の処理
        if(keyBord.Up){
            if(this.mario_jump == 0){
                this.mario_animation = ANIME_JUMP;
                this.mario_jump = 1;
                this.mario_vy = -64;
            }
            if(this.mario_jump<15)this.mario_vy = -(64-this.mario_jump);
        };
        if(this.mario_jump)this.mario_jump++;
    }

    //歩く処理
    updateWalk(){

    }

    //スプライト変更処理
    updateAnime(){

    }

    //毎フレームごとの更新処理
    update(){
        //アニメーション用のカウンタ
        this.mario_sprite_count++;
        if(Math.abs(this.vx)==MAX_SPEED)this.this.mario_sprite_count++;

        this.updateJump();
        this.updateWalk();
        this.updateAnime();

        //重力
        if(this.vy<64)this.vy+=GRAVITY;
        console.log(this.vy);
    }

    //毎フレームごとの描画処理
    draw(){
        drawSprite(this.mario_sprite_count, this.x>>4, this.y>>4);
    }
}