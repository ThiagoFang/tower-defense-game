class Projectile extends Sprite {
  constructor({position = {x: 0, y: 0}, enemy}) {
    super({position, imageSrc: 'assets/projectile.png'})
    this.velocity = {
      x: 0,
      y: 0
    }
    this.enemy = enemy
    this.radius = 10
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