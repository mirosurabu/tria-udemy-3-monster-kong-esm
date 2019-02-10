import Barrel from './Barrel.js';

export default class BarrelGroup extends Phaser.Group {
  constructor(game, spawnPoint, frequency, speed) {
    super(game, null);

    // Save barrel data for subsequent use
    this.spawnPoint  = spawnPoint;
    this.frequency   = frequency;
    this.barrelSpeed = speed;

    // Create barrel timer
    this.timer = this.game.time.events.loop(this.frequency * 1000, this.spawnBarrel, this);

    // Spawn first barrel
    this.spawnBarrel();
  }

  spawnBarrel() {
    var barrel = this.getFirstExists(false);

    if (!barrel) {
      this.add(new Barrel(this.game, this.spawnPoint.x, this.spawnPoint.y, this.barrelSpeed));
    } else {
      barrel.reset(this.spawnPoint.x, this.spawnPoint.y, this.barrelSpeed);
    }
  }
}
