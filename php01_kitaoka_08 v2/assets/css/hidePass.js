
let btn = document.getElementById("buttonEye");
const pass = document.getElementById("password");

btn.addEventListener("click",() =>{
    if(pass.type === 'password'){
        //パスワード入力欄のtype属性をtextに変換
        pass.type = 'text';
        btn.className = "fa fa-eye";
    }else{
        //パスワード入力欄のtype属性をpasswordに戻す
        pass.type = 'password';
        btn.className = "fa fa-eye-slash";
    }
})
