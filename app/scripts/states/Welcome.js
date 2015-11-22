"use strict";

App.WelcomeState.prototype = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    },

    preload: function () {

    },

    create: function () {

        var currentState = this;
        StoryMap.slider.view = new Slider();

        var storyMap = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'story');
        storyMap.anchor.setTo(0.5, 0.5);

        // @todo review if we need to apply them each time
        // @todo set filter back
        //var blurX = this.game.add.filter('BlurX');
        //var blurY = this.game.add.filter('BlurY');
        //storyMap.filters = [blurX, blurY];

        /*
        var skip_text = StoryMap.locale.welcome_xml.querySelector('[id="skip"] [code="'+StoryMap.language+'"] text').textContent;
        // @todo align right
        var skip = this.game.add.text(this.game.width - 200 , this.game.world.centerY - 230, skip_text,
            { font: '20px Arial', fill: COLOR_STR_WHITE});
        // @todo hover effect
        skip.inputEnabled = true;
        skip.events.onInputDown.add(this.skipTextDown, this);

        var skip_key = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        // @todo at the end of the slides sequence, start map
        // When the player presses the W key, we call the start function
        skip_key.onDown.addOnce(this.start, this);
        */

        if(typeof localStorage !== 'undefined') {
            // counts number of sessions
            var nbrSessions = localStorage.getItem('nbr_sessions');
            if(nbrSessions == null) {
                $("#game-start").hide();
            }
            console.log('Number of sessions = ' + nbrSessions);
        }


        $("#game-start").on('click', function(e){
            $("#game-start").off('click');
            currentState.start();
        });
    },

    // The start function calls the play state
    start: function () {
        this.game.state.start('loadMap');
    },

    resize: function (width, height){
        //console.log("Resizing width : " + width + " - height : " + height);
    },

};

module.exports = WelcomeState;