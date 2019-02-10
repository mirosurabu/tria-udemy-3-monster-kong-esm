export default class VirtualKeys extends Phaser.Group {

  constructor(game, x, y) {
    super(game, null);

    // Disable camera scrolling (i.e. set scroll factor to zero)
    this.fixedToCamera = true;

    // Set relative-to-camera position
    this.cameraOffset.x = x;
    this.cameraOffset.y = y;

    // Set opacity to 50 percent
    this.alpha = 0.5;

    // Create buttons
    this.btnLeft  = new Phaser.Button(game,  20, 0, 'arrowButton');
    this.btnRight = new Phaser.Button(game, 110, 0, 'arrowButton');
    this.btnJump  = new Phaser.Button(game, 280, 0, 'actionButton');

    // Set default state for keys
    this.keyLeft  = false;
    this.keyRight = false;
    this.keyJump  = false;

    // Setup input handlers
    this.btnLeft .events.onInputDown.add( () => this.keyLeft  = true  );
    this.btnLeft .events.onInputUp  .add( () => this.keyLeft  = false );
    this.btnRight.events.onInputDown.add( () => this.keyRight = true  );
    this.btnRight.events.onInputUp  .add( () => this.keyRight = false );
    this.btnJump .events.onInputDown.add( () => this.keyJump  = true  );
    this.btnJump .events.onInputUp  .add( () => this.keyJump  = false );

    // Add buttons to the group
    this.add(this.btnLeft);
    this.add(this.btnRight);
    this.add(this.btnJump);
  }
}
