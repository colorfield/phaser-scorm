"use strict";

/**
 * Lesson representation in JSON, based on a DAO source.
 * @constructor
 */
var Lesson = function() {
    this.dao = null;  // container for the DAO
    this.progress = {}; // @todo provide default
}

/**
 * DAO Factory
 */
Lesson.prototype.daoFactory = function() {
    switch(App.lesson.daoType){
        case App.daoTypes.SCORM:
            this.dao = new ScormDAO();
            break;
        case App.daoTypes.LOCAL:
        default:
            this.dao = new LocalStorageDAO();
            break;
    }
    return this.dao;
};

/**
 * Initializes the progress model.
 */
Lesson.prototype.initialize = function() {
    // @todo implement
};

/**
 * Sets the progress from JSON.
 * @param json
 */
Lesson.prototype.setProgress = function(json) {
    // @todo check json validity
    this.progress = json;
};

module.exports = Lesson;