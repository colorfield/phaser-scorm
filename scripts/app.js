/**
 * Application settings and globals.
 */
var App = {
    game: new Phaser.Game('100', '100', Phaser.AUTO, 'app'), // Phaser.WEB_GL based on 100%
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
        spritesheets: "assets/images/spritesheet"
    }
};

// Adds Phaser states as methods
App.BootState = function () {};
App.LanguageState = function () {};
App.WelcomeState = function () {};
App.LoadGameState = function () {};
App.GameState = function () {};

// initialize
/*
App.game.state.add('boot', App.BootState);
App.game.state.add('language', App.LanguageState);
App.game.state.add('welcome', App.WelcomeState);
App.game.state.add('loadGame', App.LoadGameState);
App.game.state.add('game', App.GameState);

App.game.state.start('boot');
*/

/**
 * Terminates session on a modal confirmation.
 * @param e
 * @returns {string}
 */
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

/**
 * End connection
 */
window.onunload = function () {
    App.lesson.model.dao.endConnection();
};