"use strict";

/**
 * Main Game state
 */
App.GameState.prototype = {

    // debug infos
    debugGroup: null,
    debugBackground: null,
    debugTextArea: null,
    debugTextStr: null,
    debugTextStyle: { font: "12px Arial", fill: "#000000", align: "left" },

    // animations array
    animations: new Array(),
    statesAnimations: new Array(),
    spritesTopLayer: new Array(),

    timeline: null,
    navButton: null,

    // @todo semantic, be more specific
    button: null,
    popup: null,
    //tween: null,
    // @todo refactoring, create a timeline view / model to be included in this state
    storyMapSteps: null,
    currentLessonStep: 1,
    currentLessonSubStep: 1,

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        StoryMap.progress.model = new MapProgress(StoryMap.progress.daoType, this);
        StoryMap.progress.view = new Timeline();
    },

    preload: function () {
        //displayPercentsLoader(this);
    },

    create: function () {

        //StoryMap.progress.model.initializeData();

        // starts the KineticScrolling plugin
        // @see https://github.com/jdnichollsc/Phaser-Kinetic-Scrolling-Plugin/blob/master/dist/phaser-kinetic-scrolling-plugin.js
        //this.game.kineticScrolling.start();

        //Changing the world height
        // @todo review cache.getImage instead of sprite
        var storyMap = this.game.cache.getImage('story');
        this.game.world.setBounds(0, 0, storyMap.width, storyMap.height);

        // @todo center map depending on the SCORM state
        this.game.camera.x = 850; // first interaction
        //this.game.camera.x = this.game.world.centerX - 500;
        //this.game.camera.y = this.game.world.centerY - 500;

        this.map = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'story');
        this.map.anchor.set(0.5);

        // hide timeline when we the mouse cursor reaches the chapter 2 section at the bottom of the screen
        var hideTimelineXPos = 0;
        var hideTimelineYPos = 1450;
        var hideTimelineWidth = 1100;
        var hideTimelineHeight = 250;
        /*
         var rect = this.game.add.graphics(0, 0);
         rect.lineStyle(0);
         rect.beginFill(0x333333, 1);
         rect.drawRect(hideTimelineXPos, hideTimelineYPos, hideTimelineWidth, hideTimelineHeight);
         */
        // @todo semantic
        var mysprite = this.game.add.sprite(hideTimelineXPos, hideTimelineYPos);
        mysprite.width = hideTimelineWidth;
        mysprite.height = hideTimelineHeight;
        mysprite.inputEnabled = true;
        mysprite.events.onInputOver.add(
            function() {
                $("#timeline").addClass('minified');
                $("#timeline .close").addClass('clicked');
                
                if ($(".chapter").hasClass("active-chapter")){
                  $(".chapter").removeClass("active-chapter");
                }
            }, this);


        // animations
        this.createAnimations();
        this.createStatesAnimations();

        // place some sprites to top
        for(var topSprite in this.spritesTopLayer){
            this.game.world.bringToTop(this.spritesTopLayer[topSprite]);
        }

        if(StoryMap.debugMode) {
            this.createDebugInfo();
            // console log model data
            StoryMap.progress.model.dao.getDebugInfo();
        }

        // @todo wrap in controller
        this.timeline = $("#timeline");
        this.navButton = $("#nav");
        $(this.timeline).addClass("visible");
        $(this.navButton).addClass("visible");
    },

    render: function()
    {
        // @see http://phaser.io/docs/2.4.2/Phaser.Time.html#advancedTiming
        if(StoryMap.debugMode) {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
        }
    },

    update: function()
    {
        // @todo in case of kineticScrolling freeze, this could be used to restart it
        //this.game.kineticScrolling.start();

        if(StoryMap.debugMode){
            var mousePositionText = "X = " + this.game.input.mousePointer.x + " - Y = " + this.game.input.mousePointer.y;
            this.debugTextArea.setText(mousePositionText);
            //this.debugTextArea.setText(this.debugTextStr);
        }
    },

    resize: function (width, height){
        // @todo resize elements
        // console.log("Resizing width : " + width + " - height : " + height);
        $("#overlay").css({
          "margin-left": -(width/2) -30,
          "width": width
        });
    },

    createAnimations: function() {
        // @todo destroy references if necessary
        //this.animations.push(new SpriteSheetAnimation('s_hola', 974, 420, 25, this.game));
        //this.animations.push(new SpriteSheetAnimation('s_bicycle_screen', 670, 320, 25, this.game));
        this.animations.push(new SpriteSheetAnimation('s_new_rules', 660, 1145, 25, this.game));
        this.animations.push(new SpriteSheetAnimation('s_pillar', 456, 1385, 25, this.game));
        this.animations.push(new SpriteSheetAnimation('s_billboard', 730, 1525, 25, this.game));
        this.animations.push(new SpriteSheetAnimation('s_baby', 1500, 1276, 25, this.game));
        //this.animations.push(new SpriteSheetAnimation('s_cyclist_run', 1102, 1165, 25, this.game));
        //this.animations.push(new SpriteSheetAnimation('s_cyclist_1', 2000, 1350, 25, this.game));
        this.animations.push(new SpriteSheetAnimation('s_big_screen', 1255, 390, 8, this.game));

        // animations overlay
        // @todo review add.image (exists ?)
        var fence = this.game.add.sprite(395, 450, 'fence');
        // var fireLion = this.game.add.sprite(2142, 105, 'fire_lion');
        var podium = this.game.add.sprite(1702, 815, 'podium');

        // use this array to bring some sprites to top
        this.spritesTopLayer.push(fence);
    },

    // @todo encapsulate in timeline controller
    createStatesAnimations: function() {

        for (var interactionName in StoryMap.interactions) {
            var stateAnimation = new StateAnimation(
                interactionName,
                StoryMap.interactions[interactionName].chapter,
                StoryMap.interactions[interactionName].part,
                this.game
            );
            stateAnimation.create();
            // default state, updated hereunder via the model
            stateAnimation.setState('not_available');
            StoryMap.stateAnimationsInstances[interactionName] = stateAnimation;
        }

        StoryMap.progress.model.initializeViews();
        StoryMap.progress.model.updateViews();

        // override default language for debug purpose
        if(QueryString.language !== undefined && QueryString.language !== ''){
            // @todo check if language exists
            StoryMap.language = QueryString.language;
        }

        // used to debug interactions
        if(QueryString.interaction !== undefined && QueryString.interaction !== ''){
            var interactionFound = false;
            for(var i in StoryMap.interactions){
                if(i == QueryString.interaction){
                    interactionFound = true;
                }
            }
            if(interactionFound){
                // @todo reference object to allow destruction if circular reference exists
                var interaction = new Interaction(QueryString.interaction);
                interaction.create();
            }else{
                alert("Check the interaction name");
            }
        }else{
            // user guide
            var userguide = new UserGuide('00_user_guide');
            userguide.create();
        }

    },

    createDebugInfo: function() {
        this.debugTextStr = "\nPHASER initialized\n";

        this.debugGroup = this.game.add.group();
        //this.debugBackground = new Phaser.Rectangle(0, 0, 300, 200);
        this.debugBackground = this.game.add.graphics(0, 0);
        this.debugBackground.beginFill(COLOR_HEX_WHITE, 1, 0.5);
        this.debugBackground.lineStyle(0, COLOR_HEX_WHITE, 1);
        this.debugBackground.drawRect(0, 0, 300, 200);
        this.debugBackground.endFill();
        this.debugGroup.add(this.debugBackground);
        //this.game.debug.geom(this.debugBackground,'#000000');
        this.debugTextArea = this.game.add.text(20, 20, this.debugTextStr, this.debugTextStyle);
        this.debugGroup.add(this.debugTextArea);

        this.debugGroup.fixedToCamera = true;
        this.game.world.bringToTop(this.debugGroup);
    },


    showDebugMessage: function(msg) {
        this.debugTextStr  += "\n";
        this.debugTextStr  += msg;
    }

};

module.exports = GameState;