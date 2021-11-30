const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const todos = JSON.parse(localStorage.getItem("todos"));

form.addEventListener("submit", (event) => {
    event.preventDefault();
    add();
});

const add = (todo) => {
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    }

    if(todoText.length > 0) {
        //liタグを作成し、フォームに入力した値を取得する
        const li = document.createElement("li");
        li.innerText = todoText;
        //liタグにbootstrapでデザインを当てるためにクラスを指定する
        li.classList.add("list-group-item");

        if(todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener("click", () => {
            //bootstrapで打消し線をつけるクラスを指定する
            //指定のクラスがあれば削除、なければ追加で打消し線を入れたり消したりする
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData();
    };  
};

const saveData = () => {
    const lists = document.querySelectorAll("li");
    let todos = [];
    //forEachのラベルにlistを指定（変数）
    lists.forEach((list) => { 
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        //配列にまとめ直してローカルストレージに保存する
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};

if(todos.length>0) {
    todos.forEach((todo) => {
        add(todo);
    });
};
