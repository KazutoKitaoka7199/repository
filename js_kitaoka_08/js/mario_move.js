//
//マリオの移動
//
const ANIME_STAND = 1;
const ANIME_WALK = 2;
const ANIME_STOP = 4;
const ANIME_JUMP = 8;

const GRAVITY = 4;
const MAX_SPEED = 32;


class Mario{
    constructor(x,y){
        this.x = x<<4;
        this.y = y<<4;
        this.vx = 0;
        this.vy = 0;
        this.anime = 0;
        this.sprite_num = 0;
        this.sprite_counter = 0;
        this.direction = 0;
        this.jump = 0;
    }

    //ジャンプ処理
    updateJump(){
        //ジャンプ動作の処理
        if(keyBord.Up){
            if(this.jump == 0){
                this.anime = ANIME_JUMP;
                this.jump = 1;
                this.vy = -64;
            }
            if(this.jump<15)this.vy = -(64-this.jump);
            // console.log(this.vy);
            // console.log(this.y);
        };
        if(this.jump)this.jump++;
    }

    updateWalksub(direction){
        
        //最高速まで加速
        if(direction==0 && this.vx< MAX_SPEED)this.vx++;
        if(direction==1 && this.vx>-MAX_SPEED)this.vx--;
            // console.log(this.vx);
            // console.log(direction);

        //ジャンプしていないとき
        if(!this.jump){
            //立ちポーズの時はカウンタをリセット
            if(this.anime==ANIME_STAND)this.sprite_counter=0;
            //歩くアニメーション
            this.anime = ANIME_WALK;
            //方向を設定
            this.direction = direction;
            //逆方向の時はブレーキをかける
            if(direction==0 && this.vx < 0)this.vx++;
            if(direction==1 && this.vx > 0)this.vx--;

            if(direction==0 && this.vx<32)this.vx+=1;
            if(direction==1 && this.vx>-32)this.vx-=1;
            //逆方向に強い加速の時にブレーキ
            if(direction==1 && this.vx>8)this.anime=ANIME_STOP;
            if(direction==0 && this.vx<-8)this.anime=ANIME_STOP;
        };
    };

    //歩く処理
    updateWalk(){
        //移動処理・アニメーションの指定
        if(keyBord.Left){
            this.updateWalksub(1);
        }else if(keyBord.Right){
            this.updateWalksub(0);
        }else {
            if(!this.jump){
                if(this.vx>0)this.vx-=1;
                if(this.vx<0)this.vx+=1;
                if(!this.vx)this.anime = ANIME_STAND;
            }
        };

    }

    //スプライト変更処理
    updateAnime(){
        //停止状態・走らせる・急ブレーキ（スプライトの決定）
        switch(this.anime){
            case ANIME_STAND:
                this.sprite_num = 0;
                break;
            case ANIME_WALK:
                this.sprite_num = 2+((this.sprite_counter>>2)%3);
                break;
            case ANIME_STOP:
                this.sprite_num = 5;
                break;
            case ANIME_JUMP:
                this.sprite_num = 6;
                break;
        }
        // if(this.anime == 0)this.sprite_num = 0;
        // else if(this.anime ==1)this.sprite_num = 2 + ((this.sprite_counter>>2)%3);
        // if(this.anime == 2)this.sprite_num = 5;
        // if(this.anime == ANIME_JUMP)this.sprite_num = 6;
        
        //左向きに切り替え
        if(this.direction == 1)this.sprite_num +=48;
    }

    //毎フレームごとの更新処理
    update(){
        //アニメーション用のカウンタ
        this.sprite_counter++;
        if(Math.abs(this.vx)==MAX_SPEED)this.sprite_counter++;

        this.updateJump();
        this.updateWalk();
        this.updateAnime();

        //マリオが移動する処理（座標移動）
        this.x += this.vx;
        this.y += this.vy;
        // console.log(this.y);

        //重力
        if(this.vy<64)this.vy+=GRAVITY;
        // console.log(this.vy);

        //地面に着地する処理
        if(this.y>160<<4){
            if(this.anime==ANIME_JUMP)this.anime=ANIME_WALK;
            this.jump = 0;
            this.vy = 0;
            this.y = 160<<4;
        };
    }

    //毎フレームごとの描画処理
    draw(){
        let px = (this.x>>4) - field.scx;
        let py = (this.y>>4) - field.scy;
        drawSprite(this.sprite_num, px, py);
    }
}