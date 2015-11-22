/**
 * Load state, used for the main game
 */
StoryMap.LoadGame.prototype = {

    currentMapPercents : 0,

    init: function () {

        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        // @todo setup and configure plugins
    },

    /**
     * This method loads the assets necessary to this screen which is a preloader by itself.
     * The background loading is done on the start method.
     */
    preload: function () {
        if(App.debug.clearStorage) {
            if(typeof localStorage !== 'undefined') {
                localStorage.clear();
            }
        }

        if(App.debug.warp) {
            // needs to load main background here, if direct access to the map
            //this.game.load.image('main-game-background', 'images/concept-art/TODO.png');
        }

        // @todo load other assets here if necessary
    },

    create: function () {

        // @todo display graphics

        this.rotateMessages();

        // create percents text for preloader
        // @todo refactoring in helper class
        var percentsMapLabel = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 180, this.currentMapPercents,
            { font: '25px Arial', fill: COLOR_STR_ORANGE});
        percentsMapLabel.anchor.setTo(0.5, 0.5);

        // background loader that keeps the screen displayed while loading the heavy stuff for the next state (GameState)
        // @see http://phaser.io/examples/v2/category/loader
        // @see http://phaser.io/examples/v2/loader/load-events
        this.game.load.onLoadStart.add(loadStart, this);
        this.game.load.onFileComplete.add(fileComplete, this);
        this.game.load.onLoadComplete.add(loadComplete, this);
        this.start();

    },

    /**
     * Background load that displays a preloader
     */
    start: function () {

        // load per interaction spriteSheet for each interaction
        this.loadSpriteSheets();
        this.loadTranslations();

        this.game.load.start();
    },


    resize: function (width, height){
        // @todo resize elements
        //console.log("Resizing width : " + width + " - height : " + height);
    },

    /**
     * Loads the translations XML files
     */
    loadTranslations: function() {
        /*
        for (var interaction in list) {
            this.game.load.text(interaction + '_xml', 'locale/interactions/'+interaction+'.xml');
        }
        */
    },

    /**
     * Loads the SpriteSheets for each available state.
     */
    loadSpriteSheets: function() {
        // @todo impl
    },

    /**
     * Displays several messages to the user while preloading.
     */
    rotateMessages: function() {
        // @todo impl
    }

};


// @todo create helper class

function loadStart() {
    //console.log("Loading ...");
}

//	This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.percentsMapLabel.setText(progress + " %");
    //console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
}

function loadComplete(){
    //console.log("Load complete");
    this.game.state.start('game');
}