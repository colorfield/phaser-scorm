App.BootState.prototype = {

    preload: function () {
        // @todo complete assets if necessary
        this.game.load.image('loading', 'images/ui/loading.png');
        // @todo background load
        this.game.load.image('main-bg', 'images/concept-art/zelda.png');
    },

    create: function () {
        // @todo provide settings
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#ffffff';
        // allows to skip language and welcome states during debug
        if(App.debug.warp){
            this.game.state.start('loadGame');
        }else{
            this.game.state.start('language');
        }
    }

};