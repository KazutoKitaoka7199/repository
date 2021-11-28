const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
// // const todos = JSON.parse(localStorage.getItem("todos"));

// if(todos) {
//     todos.forEach(todo => {
//         add(todo);
//     });
// };

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    add();
});

const add = () => {
    let todoText = input.value;

    // if(todo){
    //     todoText = todo;
    // }

    if(todoText.length > 0) {
        //liタグを作成し、フォームに入力した値を取得する
        const li = document.createElement("li");
        li.innerText = todoText;
        //liタグにデザインを当てるためにクラスを指定する
        li.classList.add("list-group-item");
        ul.appendChild(li);
        input.value = "";
        saveData();
    };  
};

const saveData = () => {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => {
        todos.push(list.innerText);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
};