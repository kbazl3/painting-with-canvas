const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d'); //need to specify if we're using the 2d or 3d context of Canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55'; //The strokeStyle property sets or returns the color, gradient, or pattern used for strokes.
ctx.lineJoin = 'round'; //The lineJoin property sets or returns the type of corner created, when two lines meet.
ctx.lineCap = 'round';// The lineCap property sets or returns the style of the end caps for a line.
ctx.lineWidth = 100;

let hue = 0;
let direction = true;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
    if (!isDrawing) { //stops the function from running if not mouse down
        return
    }
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    //start from ^^
    ctx.moveTo(lastX, lastY);
    //go to^^
    ctx.lineTo(e.offsetX, e.offsetY); //The lineTo() method adds a new point and creates a line TO that point FROM the last specified point in the canvas (this method does not draw the line).
    ctx.stroke(); //The stroke() method actually draws the path you have defined with all those moveTo() and lineTo() methods
    lastX = e.offsetX;
    lastY = e.offsetY;
    if (hue > 360) {
        hue = 0;
    }
    hue++; //increment hue so that it changes based on mouse movement
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => {
    isDrawing = false
})
canvas.addEventListener('mouseout', () => {
    isDrawing = false
})
