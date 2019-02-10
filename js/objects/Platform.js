export default class Platform extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'platform');

    // Setup physics
    this.game.physics.arcade.enable(this);
    this.body.immovable    = true;
    this.body.allowGravity = false;
  }
}
