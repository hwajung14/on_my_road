document.addEventListener('DOMContentLoaded', (event) => {
    // 첫번째 페이지
    const snowContainer = document.body;
    const snowRange = document.getElementById('snowRange');

    if (snowRange) {
        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snow');

            const size = Math.random() * 10 + 10;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;

            snowflake.style.left = `${Math.random() * 100}vw`;

            const duration = Math.random() * 3 + 2;
            snowflake.style.animationDuration = `${duration}s`;

            snowContainer.appendChild(snowflake);

            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
            });
        }

        function generateSnowflakes() {
            const count = snowRange.value;
            for (let i = 0; i < count; i++) {
                createSnowflake();
            }
        }

        setInterval(generateSnowflakes, 500);

        snowRange.addEventListener('input', () => {
            generateSnowflakes();
        });
    }

    // 두번째 페이지
    const timerElement = document.getElementById("timer");
    let time = 0;

    if (document.getElementById("me")) {
        const img = document.getElementById("me");
        let currentLocation = 0;

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                currentLocation = Math.min(currentLocation + 20, window.innerWidth - img.offsetWidth);
            } else if (event.key === "ArrowLeft") {
                currentLocation = Math.max(currentLocation - 20, 0);
            }
            img.style.left = `${currentLocation}px`;
        });

        function spawnRock() {
            const rock = document.createElement("img");
            rock.src = "img/rock.png";
            rock.classList.add("rock");
            rock.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
            document.body.appendChild(rock);

            let rockTop = -50;
            const rockInterval = setInterval(() => {
                rockTop += 5;
                rock.style.top = `${rockTop}px`;

                const rockRect = rock.getBoundingClientRect();
                const imgRect = img.getBoundingClientRect();

                if (
                    rockRect.top < imgRect.bottom &&
                    rockRect.bottom > imgRect.top &&
                    rockRect.left < imgRect.right &&
                    rockRect.right > imgRect.left
                ) {
                    clearInterval(rockInterval);
                    alert(`Game Over! Timer: ${time}s`);
                    location.reload();
                }

                if (rockTop > window.innerHeight) {
                    clearInterval(rockInterval);
                    rock.remove();
                }
            }, 50);
        }

        setInterval(spawnRock, 2000);
    }

    setInterval(() => {
        time += 1;
        if (timerElement) {
            timerElement.textContent = `Time: ${time}s`;
        }
    }, 1000);
});
// 세번째페이지
document.addEventListener('DOMContentLoaded', (event) => {
    const sp = document.querySelector('.sp');

    if (sp) {
        const totalSteps = 5;
        const stepWidth = 600;
        let currentStep = 0;

        const crunchSound = new Audio('img/crunch.mp3');

        sp.addEventListener('click', () => {
            currentStep = (currentStep + 1) % totalSteps;
            sp.style.backgroundPosition = `-${currentStep * stepWidth}px 0`;

            crunchSound.currentTime = 0;
            crunchSound.play();
        });
    }
});
// 네번째페이지
document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const blurDiv = document.getElementById('blurDiv');

    if (blurDiv) {
        toggleSwitch.addEventListener('change', () => {
            if (toggleSwitch.checked) {
                blurDiv.classList.remove('blur');
            } else {
                blurDiv.classList.add('blur');
            }
        });
    }
});
// 다섯번째페이지
document.addEventListener('DOMContentLoaded', (event) => {
    const img = document.getElementById('movable-image');
    const npc = document.getElementById('npc-image');
    const popup = document.getElementById('popup-image');
    const view = document.querySelector('.view');

    if (npc) {
        let posX = 0;
        let posY = 0;

        document.addEventListener('keydown', (event) => {
            const step = 10;

            switch (event.key) {
                case 'ArrowUp':
                    if (posY > 0) posY -= step;
                    break;
                case 'ArrowDown':
                    if (posY < view.offsetHeight - img.offsetHeight) posY += step;
                    break;
                case 'ArrowLeft':
                    if (posX > 0) posX -= step;
                    break;
                case 'ArrowRight':
                    if (posX < view.offsetWidth - img.offsetWidth) posX += step;
                    break;
            }

            img.style.left = `${posX}px`;
            img.style.top = `${posY}px`;

            checkCollision();
        });

        function checkCollision() {
            const imgRect = img.getBoundingClientRect();
            const npcRect = npc.getBoundingClientRect();

            if (
                imgRect.left < npcRect.right &&
                imgRect.right > npcRect.left &&
                imgRect.top < npcRect.bottom &&
                imgRect.bottom > npcRect.top
            ) {
                showPopup();
            }
        }

        function showPopup() {
            popup.style.display = 'block';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 10000);
        }

        let box = document.querySelector('.box');

        document.addEventListener('keydown', (e) => {
            let currentDirection = 'down';

            if (e.key === 'ArrowLeft') {
                currentDirection = 'left';
            } else if (e.key === 'ArrowRight') {
                currentDirection = 'right';
            } else if (e.key === 'ArrowUp') {
                currentDirection = 'up';
            } else if (e.key === 'ArrowDown') {
                currentDirection = 'down';
            }

            box.dataset.direction = currentDirection;
            box.dataset.walking = 'true';
        });

        document.addEventListener('keyup', () => {
            box.dataset.walking = 'false';
        });
    }
});
//
// 여섯번째페이지
document.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll(".clickable");

    if (imgs.length > 0) {
        imgs.forEach((img) => {
            let brightness = 0.08;

            img.addEventListener("click", () => {
                brightness += 0.1;
                if (brightness > 1) brightness = 1;
                img.style.filter = `brightness(${brightness})`;
            });
        });
    }
});
// 일곱번째페이지
function dragEnter(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

// 여덟번째 페이지
document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById("jsCanvas");

    if (canvas) { // Check if the element with ID 'jsCanvas' exists
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

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting); // 그림 시작
        canvas.addEventListener("mouseup", stopPainting);    // 그림 멈춤
        canvas.addEventListener("mouseleave", stopPainting); // 캔버스 밖으로 나갈 때도 멈춤

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

        canvas.addEventListener("click", handleCanvasClick);
    }
});


//아홉번쩨 페이지
document.addEventListener('DOMContentLoaded', () => {
    const collegePage = document.querySelector('.college');

    if (collegePage) {
        const images = document.querySelectorAll('.image-container img');
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScroll;
            const index = Math.min(
                Math.floor(scrollFraction * images.length),
                images.length - 1
            );

            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        });
    }
});
