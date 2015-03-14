// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var label_score;
var player;
var pipes;

var pipeInterval = 3;



/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("imgPlayer", "assets/flappy.png");
    game.load.image("mouseCursorImg", "assets/cursor.png");
    game.load.audio("spaceOgg", "assets/point.ogg");
    game.load.image("pipe", "assets/pipe.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene (with hexdecimal)
    game.stage.setBackgroundColor("#E7FF00");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(395, 200, "imgPlayer");
    game.physics.arcade.enable(player);
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, createPipe);
    player.body.gravity.y = 300;

    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    label_score = game.add.text(700, 50, "0");
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    pipes = game.add.group();
    createPipe();
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    game.physics.arcade.overlap(player, pipes, game_over);

}

function clickHandler(event) {

    prompt("Did you just click?");
    alert("If you did, then you clicked at...   " + event.x + ":" + event.y);
    alert("A mouse cursor icon will appear where it was!");
    game.add.sprite(event.x, event.y, "mouseCursorImg");

}

function spaceHandler(event) {

    player.body.velocity.y = -165;

}

function changeScore() {

    score = score + 1;
    label_score.setText(score.toString());

}

function moveRight() {

    player.x = player.x + 10;

}

function addPipeBlock(x, y) {
    var block = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;


}

function createPipe() {

    var randNum = game.rnd.integerInRange(1, 7);
    var chance = game.rnd.integerInRange(1, 2);
    for (var count = 0; count < 8; count++) {

        if (chance === 1) {
            if (count != randNum) {
                addPipeBlock(780, count * 50);
            }
        } else {
            if (randNum != 7) {
                if (count != randNum && count != randNum + 1) {
                    addPipeBlock(780, count * 50);
                }
            } else {
                if (count != randNum && count != randNum - 1) {
                    addPipeBlock(780, count * 50);
                }
            }
        }

    }
    changeScore();
}

function game_over() {

    player.velocity.y = 0;
    pipes.velocity.x = 0;

}