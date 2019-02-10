export default class Plumber extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'plumber');

    // Set the anchor to the center of the sprite
    this.anchor.setTo(0.5);

    // Setup arcade physics
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    // Running and jumping speed
    this.SPEED = 180;
    this.JUMP  = 550;

    // Setup cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // Add animations
    this.animations.add('stand', [3]);
    this.animations.add('jump',  [2]);
    this.animations.add('walk',  [0, 1, 2, 1], 6, true);

    // Let the plumber play 'stand' animation at its creation
    this.play('stand');
  }

  setVirtualKeys(vkeys) {
    this.vkeys = vkeys;
  }

  update() {
    // Update input
    const keyLeft  = this.cursors.left. isDown || this.vkeys.keyLeft,
          keyRight = this.cursors.right.isDown || this.vkeys.keyRight,
          keyJump  = this.cursors.up.   isDown || this.vkeys.keyJump;

    // Update horizontal motion
    if (keyLeft && !keyRight) {
      this.body.velocity.x = -this.SPEED;
    } else if (keyRight && !keyLeft) {
      this.body.velocity.x = +this.SPEED;
    } else if (!keyRight && !keyLeft) {
      this.body.velocity.x = 0;
    }

    // Update vertical motion
    if (keyJump && this.body.touching.down) {
      this.body.velocity.y -= this.JUMP;
    }

    // Update animation
    if ( this.body.velocity.x == 0) this.play('stand');
    if ( this.body.velocity.x != 0) this.play('walk');
    if (!this.body.touching.down  ) this.play('jump');
    if ( this.body.velocity.x  < 0) this.scale.x = +1;
    if ( this.body.velocity.x  > 0) this.scale.x = -1;
  }
}
