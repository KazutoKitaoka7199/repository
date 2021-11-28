const quiz = [
    {
        question:"ナチュラルチーズを作るときに入れる、凝乳を凝固させるもの（レンネット）の主成分は何か？",
        answers:[
            "カタラーゼ",
            "レンニン",
            "ナットウキナーゼ",
            "パパイン"
        ],
        correct:"レンニン"
    },{
        question:"原料の生乳に乳酸菌や酵素を加えるとタンパク質が固まりプリン状になります。これをカットして水分（乳清＝ホエイ）を出した後の豆腐のような固まりを何というか？",
        answers:[
            "カード(curd)",
            "アナトー",
            "レニュール",
            "フロマージュ"
        ],
        correct:"カード(curd)"
    },{
        question:"チーズの原型を作った後、塩を加えますが、その理由は次のうちどれか？",
        answers:[
            "味付け",
            "チーズの形を崩さないようにする",
            "タンパク質アミノ酸に分解する",
            "雑菌の繁殖を抑え、風味を良くする"
        ],
        correct:"雑菌の繁殖を抑え、風味を良くする"
    }
]

const qiuzLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName("button");
let buttonLength = $button.length;
//定数の文字列をHTMLに反映させる
const setupQuiz = () => {
    document.getElementById("cheese-qestion").textContent = quiz[quizIndex].question;
    let buttonIndex = 0;
    while(buttonIndex<buttonLength){
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        buttonIndex++;
    }
};
setupQuiz();

const clickHandler = (e) => {
    if(quiz[quizIndex].correct === e.target.textContent){
        window.alert("正解！");
        score++;
    }else{
        window.alert("不正解！");
    }

    quizIndex++;
    if(quizIndex<qiuzLength){
        setupQuiz();
    }else{
        window.alert("終了！あなたの正解数は" + score  + "/" + qiuzLength + "です");
    };

};

let handlerIndex = 0;
while(handlerIndex<buttonLength){
    $button[handlerIndex].addEventListener("click", (e) => {
        clickHandler(e);
    });
    handlerIndex++;
};
