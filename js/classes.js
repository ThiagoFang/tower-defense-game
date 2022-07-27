//Enemy Class
class Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position;
        this.width = 100;
        this.height = 100;
        this.waypointIndex = 0
    };

    draw() {
        context.fillStyle = 'red';
        context.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );
    };

    update() {
        this.draw();
        
        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.position.y;
        const xDistance = waypoint.x - this.position.x;
        const angle = Math.atan2(yDistance, xDistance);
        
        this.position.x += Math.cos(angle);
        this.position.y += Math.sin(angle);

        if(Math.round(this.position.x) === Math.round(waypoint.x) && 
        Math.round(this.position.y) === Math.round(waypoint.y)) {
            this.waypointIndex++
        }
    };
};
