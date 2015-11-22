App.LanguageState.prototype = {

    init: function () {
        // @todo for the resize handlers, we should probably use prototype to generalize to all states
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    },

    preload: function () {
        this.game.load.image('fr_flag', 'images/ui/buttons/fr.png');
        this.game.load.image('nl_flag', 'images/ui/buttons/nl.png');
        this.game.load.image('en_flag', 'images/ui/buttons/en.png');
    },

    create: function () {
        var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'main-bg');
        background.anchor.setTo(0.5, 0.5);
        this.renderLanguageButtons();
    },

    resize: function (width, height){
        // @todo resize elements
        //console.log("Resizing width : " + width + " - height : " + height);
    },

    renderLanguageButtons: function() {
        // @todo delegate in helper class
        var tpl = require('views/language-select');
        var html = tpl({ languages: App.language.available });
        $('body').append(html);

        $('.flag a').on('click', function() {
          $('.flag a').off('click');
          var button_language = $(this).attr('id');
          App.language.language = button_language;
          //console.log(button.name);
          App.game.state.start('welcome');
          $('#language').addClass('move');
        });
    }
};

