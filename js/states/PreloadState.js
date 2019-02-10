export default class PreloadState extends Phaser.State {

  init() {
    // Nothing here yet
  }

  preload() {
    // Images and spritesheets path
    this.load.path = 'assets/images/';

    // Load images
    this.load.image( 'ground',       'ground.png'       );
    this.load.image( 'platform',     'platform.png'     );
    this.load.image( 'gorilla',      'gorilla3.png'     );
    this.load.image( 'arrowButton',  'arrowButton.png'  );
    this.load.image( 'actionButton', 'actionButton.png' );
    this.load.image( 'barrel',       'barrel.png'       );

    // Load spritesheets
    this.load.spritesheet( 'plumber', 'player_spritesheet.png', 28, 30, 5, 1, 1 );
    this.load.spritesheet( 'bonfire', 'fire_spritesheet.png',   20, 21, 2, 1, 1 );

    // Maps path
    this.load.path = 'assets/maps/';

    // Load maps
    this.load.text('map1', 'map1.json');
  }

  create() {
    this.state.start('PlayState');
  }
}
