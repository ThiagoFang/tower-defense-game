class Projectile {
  constructor({position = {x: 0, y: 0}, enemy}) {
    this.position = position
    this.velocity = {
      x: 0,
      y: 0
    }
    this.enemy = enemy
    this.radius = 10
    this.image = new Image()
    this.image.src = 'assets/projectile.png'
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw()

    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
    )

    const projectileVelocity = 5
    this.velocity.x = Math.cos(angle) * projectileVelocity
    this.velocity.y = Math.sin(angle) * projectileVelocity

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
  
/*
context.beginPath()
context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
context.fillStyle = 'orange'
context.fill()
*/