const container = document.getElementById('container');
const scene = new THREE.Scene();

// Get label elements
// const descPr = document.getElementById('label-left-up');
const spacebarLabel = document.getElementById('label-left-bottom');
const tailCounterLabel = document.getElementById('label-right-up');
const banner = document.getElementById('banner');

// Set up an orthographic camera
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 5;
const camera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2, frustumSize * aspect / 2,
    frustumSize / 2, -frustumSize / 2,
    0.1, 1000
);
camera.position.set(0, 0, 0.3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Lighting setup
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(5, 5, 10);
light.castShadow = false;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Define world axes
const worldAxisZ = new THREE.Vector3(0, 0, 1);
const worldAxisX = new THREE.Vector3(1, 0, 0);

let autoRotate = false;
let rotationInterval = null;

// Track rotation angles
let rotationX = 0;
let rotationZ = 0;

const mainRadius = 2;

// Create a sphere
const geometry = new THREE.SphereGeometry(mainRadius, 16, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x999900, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Static snake head at the top
const snakeHeadRadius = 0.2;
const snakeHeadGeometry = new THREE.SphereGeometry(snakeHeadRadius, 8, 8);
const snakeHeadMaterial = new THREE.MeshStandardMaterial({ color: 0x10aa10, roughness: 0.4, metalness: 0.3 });
const snakeHead = new THREE.Mesh(snakeHeadGeometry, snakeHeadMaterial);
snakeHead.position.set(0, 0, -mainRadius);
scene.add(snakeHead);

let keyCount = 0;
let headPos = new THREE.Vector3();
let Foods = [];
let Tail = [];
const deltaAngle = 0.01;

document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('keydown', handleKeyPress);

    let keys = {};
    let lastKeyPressTime = 0;
    const keyPressInterval = 10; // 10 milliseconds

    document.addEventListener('keydown', (event) => {
        keys[event.key] = true;
        handleContinuousKeyPress();
    });

    document.addEventListener('keyup', (event) => {
        keys[event.key] = false;
    });

    function handleContinuousKeyPress() {
        const currentTime = Date.now();
        if (currentTime - lastKeyPressTime >= keyPressInterval) {
            if (keys['ArrowLeft']) { // Left arrow key - rotate around world Z
                applyWorldRotation(worldAxisZ, -deltaAngle*4);
            }
            if (keys['ArrowRight']) { // Right arrow key - rotate around world Z
                applyWorldRotation(worldAxisZ, deltaAngle*4);
            }
            lastKeyPressTime = currentTime;
        }
        requestAnimationFrame(handleContinuousKeyPress);
    }

    function handleKeyPress(event) {
        const key = event.key;
        if (key === ' ') { // Spacebar - toggle auto rotation
            toggleAutoRotation();
        }
    }

    // Functions to simulate keydown and keyup events
    // let isMouseDown = false;
    // let lastKeyPressTimel = 0;
    let lastKeyPressTimer = 0;

    function simulatePressKeyEvent() {
        toggleAutoRotation();
    }

    // function removeBanner() {
    //     banner.style.display = 'none';
    //     // descPr.style.display = `none`;
    // }

    // Add click event listeners to the labels
    // banner.addEventListener('click', () => removeBanner()); // Removes banner with a click
    spacebarLabel.addEventListener('click', () => simulatePressKeyEvent()); // Spacebar

    // Jostick
    const joystick = document.getElementById('joystick');
    // const joystickHandle = document.getElementById('joystick-handle');
    let joystickActive = false;
    let isJoystickDown = false;
    let joystickCenter = { x: joystick.offsetWidth / 2, y: joystick.offsetHeight / 2 };
    

    joystick.addEventListener('touchstart', (event) => {
        joystickActive = true;
        event.preventDefault(); // Prevent default touch behavior
    });

    let isAnimating = false;

    let joystickForce = 0;  // Store the force dynamically

    function jDownEvent() {
        if (isJoystickDown) {
            const currentTime2 = Date.now();
            if (currentTime2 - lastKeyPressTimer >= keyPressInterval) {
                applyWorldRotation(worldAxisZ, deltaAngle * joystickForce * 4);
                lastKeyPressTimer = currentTime2;
            }
        }
        if (isAnimating) {
            requestAnimationFrame(jDownEvent); // Keep looping
        }
    }

    joystick.addEventListener('touchmove', (event) => {
        if (joystickActive) {
            const touch = event.touches[0];
            const rect = joystick.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const dx = x - joystickCenter.x;
            const maxDistance = joystick.offsetWidth / 2;

            joystickForce = dx / maxDistance; // Update force continuously
            if (!isAnimating) {
                isAnimating = true;
                isJoystickDown = true;
                jDownEvent(); // Start rotation loop
            }
        }
        event.preventDefault();
    });

    joystick.addEventListener('touchend', (event) => {
        joystickActive = false;
        isJoystickDown = false;
        isAnimating = false;
        joystickForce = 0;  // Stop movement
    });


});


function applyWorldRotation(axis, angle) {
    const quat = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    sphere.quaternion.premultiply(quat);
}

const foodRadius = 0.1;

function addFood() {
    const foodGeometry = new THREE.SphereGeometry(foodRadius, 8, 8);
    const foodMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.3, metalness: 0.6 });
    const food = new THREE.Mesh(foodGeometry, foodMaterial);

    food.castShadow = true;
    food.receiveShadow = true;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = mainRadius * Math.sin(phi) * Math.cos(theta);
    const y = mainRadius * Math.sin(phi) * Math.sin(theta);
    const z = mainRadius * Math.cos(phi);

    food.position.set(x, y, z);

    sphere.add(food);
    Foods.push(food);
}

let Mines = [];

function addMine() {
    const mineGeometry = new THREE.SphereGeometry(foodRadius, 8, 8);
    const mineMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, roughness: 0.3, metalness: 0.6 });
    const mine = new THREE.Mesh(mineGeometry, mineMaterial);

    mine.castShadow = true;
    mine.receiveShadow = true;

    const mineWorldPos = new THREE.Vector3();
    let haveMine = false;

    while (!haveMine) {

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = mainRadius * Math.sin(phi) * Math.cos(theta);
        const y = mainRadius * Math.sin(phi) * Math.sin(theta);
        const z = mainRadius * Math.cos(phi);

        mine.position.set(x, y, z);
        mine.getWorldPosition(mineWorldPos);
        distance = mineWorldPos.distanceTo(snakeHead.position);
        if (distance > 1.5){
            haveMine = true;
        }
    }

    sphere.add(mine);
    Mines.push(mine);
}

function updateTailCounter() {
    tailCounterLabel.innerText = `Tail grown: ${Tail.length}`;
}

function addTail() {
    const tailGeometry = new THREE.SphereGeometry(foodRadius * 1.2, 8, 8);
    const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x10aa10, roughness: 0.3, metalness: 0.6 });
    const tailS = new THREE.Mesh(tailGeometry, tailMaterial);

    tailS.castShadow = true;
    tailS.receiveShadow = true;

    const headWorldPos = new THREE.Vector3(0, -snakeHeadRadius+foodRadius, -mainRadius);
    const headLocalPos = new THREE.Vector3();
    sphere.worldToLocal(headLocalPos.copy(headWorldPos));
    tailS.position.copy(headLocalPos);

    sphere.add(tailS);
    Tail.unshift(tailS);
}

let foodEated = false;
let distance = 0;
let haveWinner = false;
let gameOver = false;

function checkCollisions() {
    for (let i = Foods.length - 1; i >= 0; i--) {
        const foodInstance = Foods[i];
        const foodWorldPos = new THREE.Vector3();
        foodInstance.getWorldPosition(foodWorldPos);
        distance = foodWorldPos.distanceTo(snakeHead.position);

        if (distance < snakeHeadRadius + foodRadius) {
            sphere.remove(foodInstance);
            Foods.splice(i, 1);
            addFood();
            if (Mines.length < 25 && Mines.length+5 < Tail.length) {
                addMine();
            }
            foodEated = true;
        }
    }
    for (let i = Mines.length - 1; i >= 0; i--) {
        const mineInstance = Mines[i];
        const mineWorldPos = new THREE.Vector3();
        mineInstance.getWorldPosition(mineWorldPos);
        distance = mineWorldPos.distanceTo(snakeHead.position);

        if (distance < snakeHeadRadius + foodRadius*0.5) {
            sphere.remove(mineInstance);
            Mines.splice(i, 1);
            addMine();
            if (Tail.length >= 10) {
                for (let j = 0; j <= 9; j++) {
                    sphere.remove(Tail.pop());
                }
                updateTailCounter();
                autoRotate = !autoRotate;
                clearInterval(rotationInterval);
            } else { // game over
                banner.src = 'matrix.png';
                banner.style.display = 'block';
                banner.style.zIndex = '9';
                spacebarLabel.style.zIndex = '10';
                joystick.style.zIndex = '10';
                gameOver = true;
                autoRotate = !autoRotate;
                clearInterval(rotationInterval);
    
                // location.reload();
            }

        }
    }
    if (Tail.length > 10) {
        const tailInst = Tail[Tail.length-1];
        const tailWorldPos = new THREE.Vector3();
        tailInst.getWorldPosition(tailWorldPos);
        distance = tailWorldPos.distanceTo(snakeHead.position);

        if (distance < snakeHeadRadius) { // winner!
            banner.src = 'win.png';
            banner.style.display = 'block';
            banner.style.zIndex = '9';
            spacebarLabel.style.zIndex = '10';
            joystick.style.zIndex = '10';
            haveWinner = true;
            autoRotate = !autoRotate;
            clearInterval(rotationInterval);
            // location.reload();
        }
    }
}
let everyTen = 0;

function toggleAutoRotation() {
    // descPr.style.display = `none`;
    if (autoRotate) {
        clearInterval(rotationInterval);
        autoRotate = !autoRotate;
    } else {
        if (banner.style.display === 'none') {
            rotationInterval = setInterval(() => {
                if (everyTen === 9) {
                    addTail();
                    if (foodEated) {
                        foodEated = false;
                        updateTailCounter();
                    } else {
                        sphere.remove(Tail.pop());
                    }
                    everyTen = 0;
                } else {
                    everyTen++;
                }

                applyWorldRotation(worldAxisX, -deltaAngle);

                keyCount++;
                if (keyCount % 100 === 0 && Foods.length <= 2) {
                    addFood();
                }
            }, 10);
            autoRotate = !autoRotate;
        } else {
            if (haveWinner || gameOver) {
                location.reload();
            } else {
                banner.style.display = 'none';
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    checkCollisions();
    renderer.render(scene, camera);
}

function startGame(){
    addFood();
    for (let i=1; i < 5; i++){
        addMine();
    }
}

startGame();
animate();
