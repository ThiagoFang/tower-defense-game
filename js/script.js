const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Canvas Configs
canvas.width = 1280;
canvas.height = 768;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const placementeTilesData2D = [];
for (let i = 0; i < placementeTilesData.length; i += 20){
    placementeTilesData2D.push(placementeTilesData.slice(i, i + 20));
};

const placementTile = [];

placementeTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 14) {
            placementTile.push(
                new PlacementTile({
                    position: {
                        x: x * 64,
                        y: y * 64
                    }
                })
            );
        };
    });
});

// Draw
const image = new Image('./assets/gameMap.png');
image.onload = () => {
    animate();
};
image.src = ('./assets/gameMap.png');

const enemies = []

for (let i = 1; i <= 10; i++) {
    const xOffset = i * 150
    enemies.push(new Enemy({ 
        position: {x: waypoints[0].x - xOffset, y: waypoints[0].y} 
    }));
};

const buildings = [];
let activeTile = undefined;

const animate = () => {
    requestAnimationFrame(animate);

    context.drawImage(image, 0, 0);
    enemies.forEach(enemy => {
        enemy.update();
    });
    placementTile.forEach(tile => {
        tile.update(mouse)
    });
    buildings.forEach(building => {
        building.draw();
        building.projectiles.forEach(projectile => {
            projectile.draw();
        });
    })
};
const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event) => {
    if(activeTile && !activeTile.occupied) {
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }));
        activeTile.occupied = true;
    };
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    activeTile = null;
    for (let i = 0; i < placementTile.length; i++) {
        const tile = placementTile[i]
        if (
            mouse.x > tile.position.x &&
            mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y &&
            mouse.y < tile.position.y + tile.size
          ) {
            activeTile = tile;
            break;
          };
    };
});

animate();
