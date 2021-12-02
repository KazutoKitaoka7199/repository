const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

context.rect(250,0, canvas.width, canvas.height);
context.fillStyle = "#fff";
context.fill();

// context.beginPath();
// context.moveTo(500,500);

// context.lineTo(100,100);
// context.strokeStyle = "#222";
// context.lineWidth = 5;
// context.stroke();

let mouse = {
    x:0,
    y:0
};
canvas.addEventListener("mousemove",(e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    console.log(mouse);
},false);

canvas.addEventListener("mousedown",(e) => {
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);

    canvas.addEventListener("mousemove", onPaint, false);
}, false);

canvas.addEventListener("mouseup", ()=> {
    canvas.removeEventListener("mousemove",onPaint,false);
});

const onPaint = () => {
    context.lineTo(mouse.x,mouse.y);
    context.stroke();
}