"use strict";

/**
 * Abstract Modal view.
 * @constructor
 */
var Modal = function (elementID) {
    this.elementID = elementID || '#overlay';
    this.setup();
}

Modal.prototype.setup = function(){
    console.log("MODAL SETUP");
};

/**
 * Opens the modal overlay.
 */
Modal.prototype.openOverlay = function() {
    console.log('Open overlay');
    $(this.elementID).modal({
        overlay: "#000",            // Overlay color
        opacity: 0.75,              // Overlay opacity
        zIndex: 1,                  // Overlay z-index.
        escapeClose: false,         // Allows the user to close the modal by pressing `ESC`
        clickClose: false,          // Allows the user to close the modal by clicking the overlay
        closeText: '',              // Text content for the close <a> tag.
        closeClass: 'close-modal',  // Add additional class(es) to the close <a> tag.
        showClose: false,            // Shows a (X) icon/link in the top-right corner
        modalClass: "modal",        // CSS class added to the element being displayed in the modal.
        spinnerHtml: null,          // HTML appended to the default spinner during AJAX requests.
        showSpinner: true,          // Enable/disable the default spinner during AJAX requests.
        fadeDuration: 150,          // Number of milliseconds the fade transition takes (null means no transition)
        fadeDelay: 1.0              // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
    });
};

/**
 * Closes the modal overlay.
 * Removes events listeners.
 */
Modal.prototype.closeOverlay = function() {
    $(this.elementID + " a.close").off("click");
    $(this.elementID + " #game-close").off("click");
    $(this.elementID).off("keydown");
    //$(this.elementID + " #overlay #not-again").off("click");
    $.modal.close();
};

module.exports = Modal;