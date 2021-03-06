export default class Gorilla extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'gorilla');

    // Setup physics
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
  }
}
