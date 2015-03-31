// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var scoreP1 = 0;
var scoreP2 = 0;
var label_scoreP1;
var label_scoreP2;
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
    game.load.audio("jump", "assets/jump.ogg");
    game.load.audio("crash", "assets/fall-crash.ogg");
    game.load.image("imgPlayer2", "assets/player-2.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene (with hexadecimal)
    game.stage.setBackgroundColor("#E7FF00");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(395, 200, "imgPlayer");
    game.physics.arcade.enable(player);
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, createPipe);
    player.body.gravity.y = 300;

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(jump);
    label_scoreP1 = game.add.text(700, 50, "0");
    label_scoreP2 = game.add.text(90, 50, "0");
    pipes = game.add.group();
    createPipe();

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    game.physics.arcade.overlap(player, pipes, game_over);

}

function jump(event) {

    if (player.body.velocity.y != 100) {
        player.body.velocity.y = -165;
    }
    game.sound.play("jump");

}

function changeScore() {

    score = score + 1;
    label_score.setText(score.toString());
    game.sound.play("spaceOgg");

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

    player.velocity.y = 100;
    pipes.velocity.x = 0;
    game.sound.play("crash");

}
