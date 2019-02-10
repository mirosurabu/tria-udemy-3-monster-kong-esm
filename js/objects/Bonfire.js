export default class Bonfire extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'bonfire');

    // Setup physics
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    
    // Setup animation
    this.animations.add('burn', [0, 1], 4, true);
    this.play('burn');
  }
}
