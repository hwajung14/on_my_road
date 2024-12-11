// 여섯번째 페이지
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 630;

ctx.strokeStyle = '#000000'; // 기본 선 색
ctx.fillStyle = '#000000';   // 기본 채우기 색
ctx.lineWidth = 2.5;         // 기본 선 굵기

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); // 선을 그릴 끝 점
        ctx.stroke();     // 캔버스에 선을 그림
    }
}

// 이벤트 리스너 추가
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // 그림 시작
    canvas.addEventListener("mouseup", stopPainting);    // 그림 멈춤
    canvas.addEventListener("mouseleave", stopPainting); // 캔버스 밖으로 나갈 때도 멈춤
}

const colors = document.getElementsByClassName("jsColor");

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 선 색 변경
    ctx.fillStyle = color;   // 채우기 색 변경
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

const range = document.getElementById("jsRange");

if (range) {
    range.addEventListener("input", handleRangeChange);
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

const mode = document.getElementById("jsMode");

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height); // 채우기 색으로 캔버스 채움
    }
}

if (canvas) {
    canvas.addEventListener("click", handleCanvasClick);
}
