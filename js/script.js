const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Canvas Configs
canvas.width = 1280;
canvas.height = 768;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);



// Draw
const image = new Image('./assets/gameMap.png');
image.onload = () => {
    animate();
};
image.src = ('./assets/gameMap.png');

const enemy = new Enemy({
    position: {x: 200, y: 200},
});
const enemy2 = new Enemy({
    position: {x: 0, y: 200},
});

const animate = () => {
    requestAnimationFrame(animate);

    context.drawImage(image, 0, 0);
    enemy.update();
    enemy2.update();
};
animate();
