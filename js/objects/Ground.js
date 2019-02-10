export default class Ground extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'ground');

    // Setup physics
    this.game.physics.arcade.enable(this);
    this.body.immovable    = true;
    this.body.allowGravity = false;
  }
}
