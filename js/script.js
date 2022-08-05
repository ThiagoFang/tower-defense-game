const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Canvas Configs
canvas.width = 1280;
canvas.height = 768;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const placementeTilesData2D = [];
const placementTile = [];

for (let i = 0; i < placementeTilesData.length; i += 20){
    placementeTilesData2D.push(placementeTilesData.slice(i, i + 20));
};

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

// Load Background
const image = new Image('./assets/gameMap.png');
image.onload = () => {
    animate();
};
image.src = ('./assets/gameMap.png');

//Creating Enemies
const enemies = []
let spawnCount = 3
const spawnEnemies = (spawnCount) => {
    for (let i = 1; i < spawnCount + 1; i++) {
        const xOffset = i * 150
        enemies.push(new Enemy({ 
            position: {x: waypoints[0].x - xOffset, y: waypoints[0].y} 
        }));
    };
};
spawnEnemies(spawnCount);

//Updating all the objects in the screen
const buildings = [];
let activeTile = undefined;
let hearths = 10;
let coins = 100;
const explosions = [];

const gameOver = (animationId) => {
    const gameOverText = document.querySelector('.game-over--txt');
    cancelAnimationFrame(animationId);
    gameOverText.style.display = 'flex';
};

const changeCoins = (value) => {
    const coinsDiv = document.querySelector('.coins-info');
    coins += value
    coinsDiv.innerHTML = coins;
}

const updateHearths = (value) => {
    const healthInfo = document.querySelector('.health-info');
            hearths += value
            healthInfo.innerHTML = hearths
}

const animate = () => {
    const animationId = requestAnimationFrame(animate);
    context.drawImage(image, 0, 0);

    for(let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update();
        if(enemy.position.x > canvas.width) {
            updateHearths(-1)
            enemies.splice(i, 1);
            if(hearths === 0) gameOver(animationId);
        };
    };

    for(let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i]
        explosion.draw()
        explosion.update()

        if(explosion.frames.current >= explosion.frames.max - 1) {
            explosions.splice(i, 1)
        }
    }

    //Tracking total amount of enemies
    if(enemies.length === 0) {
        spawnCount += 2
        spawnEnemies(spawnCount);
    }

    placementTile.forEach(tile => {
        tile.update(mouse)
    });

    buildings.forEach(building => {
        building.update();
        building.target = null;
        const validEnemies = enemies.filter(enemy => {
            const xDiference = enemy.center.x - building.center.x;
            const yDiference = enemy.center.y - building.center.y;
            const distance = Math.hypot(xDiference, yDiference);
            return distance < enemy.radius + building.radius;
        });
        building.target = validEnemies[0];

        for(let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i];
            projectile.update();

            const xDiference = projectile.enemy.center.x - projectile.position.x;
            const yDiference = projectile.enemy.center.y - projectile.position.y;
            const distance = Math.hypot(xDiference, yDiference);

            //this is when a projectile hits an enemy
            if (distance < projectile.enemy.radius + projectile.radius) {
                projectile.enemy.health -= 25;
                if(projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex(enemy => {
                        return projectile.enemy === enemy
                    });
                    if(enemyIndex > -1) {
                        enemies.splice(enemyIndex, 1);
                        changeCoins(25);
                    };
                };
                explosions.push(new Sprite({
                    position: { 
                        x: projectile.position.x, 
                        y: projectile.position.y 
                    },
                    imageSrc: './assets/explosion.png',
                    frames: {max: 4},
                    offset: {x:0, y:0}
                }));
                building.projectiles.splice(i, 1);
            };
        };
    });
};

//Mouse Actions
const mouse = {
    x: undefined,
    y: undefined
}
canvas.addEventListener('click', (event) => {
    if(activeTile && !activeTile.occupied && coins - 50 >= 0) {
        changeCoins(-50)
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }));
        activeTile.occupied = true;
        buildings.sort((a, b) => {
            return a.position.y - b.position.y;
        });
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