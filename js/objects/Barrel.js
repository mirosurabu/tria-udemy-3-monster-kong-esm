export default class Barrel extends Phaser.Sprite {
  constructor(game, x, y, speed) {
    super(game, x, y, 'barrel');

    this.game.physics.arcade.enable(this);
    this.body.velocity.x         = speed;
    this.body.bounce.x           = +1;
    this.body.collideWorldBounds = true;
  }

  reset(x, y, speed) {
    super.reset(x, y);

    this.body.velocity.x         = speed;
    this.body.bounce.x           = +1;
    this.body.collideWorldBounds = true;
  }

  update() {
    if (this.x < 10 && this.y > 600) {
      this.kill();
    }
  }
}
