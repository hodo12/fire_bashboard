const robot = document.getElementById("robot");

const robotXText = document.getElementById("robotX");
const robotYText = document.getElementById("robotY");

const fireButton = document.getElementById("fireButton");
const resetButton = document.getElementById("resetButton");

const robotStatus = document.getElementById("robotStatus");
const fireStatus = document.getElementById("fireStatus");

const map = document.getElementById("map");
const eventLog = document.getElementById("eventLog");


let robotX = 20;
let robotY = 60;

let directionX = 1;
let directionY = 0.5;

let firstFire = true;


/* =========================
   로봇 이동
========================= */

function moveRobot() {

    robotX += directionX;
    robotY += directionY;


    if (robotX >= 90 || robotX <= 10) {
        directionX *= -1;
    }


    if (robotY >= 90 || robotY <= 10) {
        directionY *= -1;
    }


    robot.style.left = robotX + "%";
    robot.style.top = robotY + "%";


    robotXText.textContent =
        (robotX / 10).toFixed(2);

    robotYText.textContent =
        (robotY / 10).toFixed(2);
}


/* 500ms마다 이동 */

setInterval(moveRobot, 500);



/* =========================
   화재 감지
========================= */

fireButton.addEventListener(
    "click",
    detectFire
);


function detectFire() {

    /* 현재 위치에 불꽃 생성 */

    const fire = document.createElement("div");

    fire.className = "fire";

    fire.innerHTML = "🔥";

    fire.style.left = robotX + "%";
    fire.style.top = robotY + "%";

    map.appendChild(fire);


    /* 상태 변경 */

    robotStatus.textContent =
        "🚨 화재 감지";

    robotStatus.style.color =
        "#ef4444";


    fireStatus.textContent =
        "🔥 FIRE DETECTED";

    fireStatus.style.color =
        "#ef4444";


    /* 시간 */

    const now =
        new Date().toLocaleTimeString();


    /* 처음 화재라면 안내문 삭제 */

    if (firstFire) {

        eventLog.innerHTML = "";

        firstFire = false;
    }


    /* 이벤트 기록 */

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>${now}</td>

        <td>
            ${(robotX / 10).toFixed(2)} m
        </td>

        <td>
            ${(robotY / 10).toFixed(2)} m
        </td>

        <td>
            🔥 화재 감지
        </td>

    `;


    eventLog.prepend(row);
}



/* =========================
   시스템 초기화
========================= */

resetButton.addEventListener(
    "click",
    resetSystem
);


function resetSystem() {

    robotStatus.textContent =
        "● 정상 순찰 중";

    robotStatus.style.color =
        "#22c55e";


    fireStatus.textContent =
        "● NORMAL";

    fireStatus.style.color =
        "#22c55e";
}