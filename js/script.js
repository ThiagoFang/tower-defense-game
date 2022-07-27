const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Canvas Configs
canvas.width = 1280;
canvas.height = 768;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image('./assets/gameMap.png');
image.onload = () => {
    context.drawImage(image, 0, 0);
};
image.src = ('./assets/gameMap.png')
