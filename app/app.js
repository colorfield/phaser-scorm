"use strict";

var App = {
    questions: ['q1', 'q2', 'q3'],
    //game: new Phaser.Game('100', '100', Phaser.AUTO, 'app'), // Phaser.WEB_GL based on 100%
    init: function init() {
        console.log("Application initialized");
        // @todo move temporary test of Jade templating system
        //var modal = require('scripts/controllers/Modal');
        //console.log(modal);
        var tmpl = require('views/modal');
        var html = tmpl({ questions: App.questions });
        $('body').append(html);

        // @todo game states
        /*
        App.game.state.add('boot', App.BootState);
        App.game.state.add('language', App.LanguageState);
        App.game.state.add('welcome', App.WelcomeState);
        App.game.state.add('loadGame', App.LoadGameState);
        App.game.state.add('game', App.GameState);

        App.game.state.start('boot');
        */
    }
};

// Adds Phaser states as methods
App.BootState = function () {};
App.LanguageState = function () {};
App.WelcomeState = function () {};
App.LoadGameState = function () {};
App.GameState = function () {};

module.exports = App;

//# sourceMappingURL=app.min.js.map

/**
 * Application settings and globals.
 */
/*
var App = {
    daoTypes : {
        SCORM : 0,
        LOCAL : 1
    },
    // SCORM lesson location representation
    lesson: {
        model: null,
        daoType: null,
    },
    // caches the parsed locale XML files
    locale: {},
    language: {
        language: null,
        available: {
            fr_BE: 'Français',
            nl_NL: 'Nederlands',
            en_UK: 'English'
        }
    },
    // production settings all set to false
    debug: {
        info: false, // displays debug info
        disableStorage: false, // if set to true, enforces LocalStorageDAO and disables I/O on localStorage
        clearStorage: false, // Storage: false,  // empties localStorage
        warp: false // direct access to the main game state
    },
    paths: {
        // @todo append assets directories
        spritesheets: "assets/images/spritesheet",
        locale: "assets/locale"
    }
};
*/

/**
 * Terminates session on a modal confirmation.
 * @todo
 * @param e
 * @returns {string}
 */
/*
window.onbeforeunload = function (e) {
    // @todo locale
    var closeLabel = "Close ?";
    e = e || window.event;
    // For IE and Firefox prior to version 4
    if (e) {
        // @todo locale
        e.returnValue = closeLabel;
    }
    // @todo only if the model exists !
    App.lesson.model.dao.terminateSession();
    // For Safari
    return closeLabel;
};
*/

/**
 * Ends connection
 * @todo
 */
/*
window.onunload = function () {
    App.lesson.model.dao.endConnection();
};
*/