import VirtualKeys from '../objects/VirtualKeys.js';
import Ground      from '../objects/Ground.js';
import Plumber     from '../objects/Plumber.js';
import Platform    from '../objects/Platform.js';
import Bonfire     from '../objects/Bonfire.js';
import BarrelGroup from '../objects/BarrelGroup.js';
import Gorilla     from '../objects/Gorilla.js';

export default class PlayState extends Phaser.State {

  init() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.game.world.setBounds(0, 0, 360, 700);
  }

  create() {
    // Translate map from JSON format to JS object format
    this.map = JSON.parse(this.game.cache.getText('map1'));

    // Create virtual keyboard
    this.vkeys = new VirtualKeys(this.game, 0, 535);

    // Create ground
    this.ground = new Ground(this.game, this.map.ground.x, this.map.ground.y);

    // Create plumber
    this.plumber = new Plumber(this.game, this.map.plumber.x, this.map.plumber.y);
    this.plumber.scale.x = this.map.plumber.scaleX;
    this.plumber.setVirtualKeys(this.vkeys);

    // Create platforms
    this.platforms = new Phaser.Group(this.game, null);
    for (let p of this.map.platforms) {
      this.platforms.add(new Platform(this.game, p.x, p.y));
    }

    // Create bonfires
    this.bonfires = new Phaser.Group(this.game, null);
    for (let bf of this.map.bonfires) {
      this.bonfires.add(new Bonfire(this.game, bf.x, bf.y));
    }

    // Create barrel group
    this.barrels = new BarrelGroup(this.game, this.map.gorilla, this.map.barrelFrequency, this.map.barrelSpeed);

    // Create gorilla
    this.gorilla = new Gorilla(this.game, this.map.gorilla.x, this.map.gorilla.y);

    // Let camera follow plumber
    this.game.camera.follow(this.plumber);

    // Add game objects to world
    this.world.add(this.ground);
    this.world.add(this.platforms);
    this.world.add(this.bonfires);
    this.world.add(this.gorilla);
    this.world.add(this.barrels);
    this.world.add(this.plumber);
    this.world.add(this.vkeys);
  }

  update() {
    // Plumber collisions (with ground and platforms)
    this.game.physics.arcade.collide(this.plumber, this.ground);
    this.game.physics.arcade.collide(this.plumber, this.platforms);

    // Barrel collisions (with ground and platforms)
    this.game.physics.arcade.collide(this.barrels, this.ground);
    this.game.physics.arcade.collide(this.barrels, this.platforms);

    // Plumber intersections (with bonfires, barrels and gorilla)
    this.game.physics.arcade.overlap(this.plumber, this.bonfires, this.onHitBonfire);
    this.game.physics.arcade.overlap(this.plumber, this.barrels,  this.onHitBarrel);
    this.game.physics.arcade.overlap(this.plumber, this.gorilla,  this.onHitGorilla);
  }

  onHitBonfire(plumber, bonfire) {
    console.log(`${(plumber.game.time.now / 1000).toFixed(1)}s: Plumber touches bonfire and dies.`);
    plumber.game.state.start('PlayState');
  }

  onHitGorilla(plumber, gorilla) {
    alert(`${(plumber.game.time.now / 1000).toFixed(1)}s: Plumber wins!`);
    plumber.game.state.start('PlayState');
  }

  onHitBarrel(plumber, barrel) {
    console.log(`${(plumber.game.time.now / 1000).toFixed(1)}s: Plumber touches barrel and dies.`);
    plumber.game.state.start('PlayState');
  }
}
