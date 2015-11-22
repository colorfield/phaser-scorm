"use strict";

/**
 * Locale (l10n) helper.
 * @constructor
 */
function Locale() {
}

/**
 * Returns a localized string in the current global language.
 * Uses two level caching mechanism : globally parsed in the best case or parsed from the Phaser game cache.
 * Assumes that a global language has been set.
 * @param strID
 * @param xml file used as key as well.
 */
Locale.prototype.localizeByID = function(strID, xml) {
    var result = '';
    var parsedXML = null;
    // checks first if the parsed XML exists in the App locale
    if(typeof App.locale[xml] !== 'undefined'){
        parsedXML = App.locale[xml];
    // otherwise parse it from the cache (should be preloaded on the Phaser loadState)
    }else{
        var parser = new DOMParser();
        var cachedXML = App.game.cache.getText(xml);
        if(typeof cachedXML !== 'undefined'){
            parsedXML = parser.parseFromString(cachedXML, "text/xml");
        // otherwise loads it in the background
        }else{
            // @todo in this case, we must use a callback before calling the querySelector
            // this.game.load.text(xml, App.paths.locale + '/' + xml + '.xml');
        }
    }
    result = parsedXML.querySelector('[id="'+strID+'"] [code="'+App.language.language+'"] text').textContent;
    return result;
};

module.exports = Locale;