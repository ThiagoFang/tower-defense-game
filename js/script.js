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

const enemies = []

for (let i = 1; i <= 10; i++) {
    const xOffset = i * 200
    enemies.push(new Enemy({ 
        position: {x: waypoints[0].x - xOffset, y: waypoints[0].y} 
    }));
};

const animate = () => {
    requestAnimationFrame(animate);

    context.drawImage(image, 0, 0);
    enemies.forEach(enemy => {
        enemy.update();
    });
};
animate();
