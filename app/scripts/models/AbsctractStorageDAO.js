"use strict";

/**
 * Defines common behaviour between DAO.
 * @constructor
 */
var AbstractStorageDOA = function() {
    this.startDate = null;
};

/**
 * Wrapper for session start operations.
 */
AbstractStorageDOA.prototype.createSession = function() {
    console.log("DA0 [abstract] - createSession");
    this.setSessionNumber();
    this.startSessionTime();
    this.getSessionProgression(); // concrete method
};

/**
 * Wrapper for session end operations.
 */
AbstractStorageDOA.prototype.terminateSession = function() {
    this.saveSessionProgression();
    var sessionTime = this.getSessionTime();
    this.saveSessionTime(sessionTime); // concrete method
    var score = this.calculateScore();
    this.saveScore(score.percentsComplete); // concrete method
    this.saveCurrentInteraction(score.currentInteraction);  // concrete method
};

/**
 * Increments session number.
 */
AbstractStorageDOA.prototype.setSessionNumber = function() {
    if(typeof localStorage !== 'undefined') {
        var nbrSessions = localStorage.getItem('scorm_phaser_sessions');
        if(nbrSessions !== null) {
            nbrSessions = parseInt(nbrSessions);
        } else {
            nbrSessions = 1;
        }
        console.log("Number of sessions = " + nbrSessions);
        ++nbrSessions;
        localStorage.setItem('scorm_phaser_sessions', nbrSessions);
    }
};

/**
 * Saves an interaction for the progress and get the results.
 * @param interactionName
 */
AbstractStorageDOA.prototype.saveInteraction = function(interactionName) {
    console.log("DAO [abstractStorage] - saveInteraction " + interactionName);
    // update the progress

    // @todo update JSON model
    // @todo set interaction as completed
    // @todo update views in controller - use observable / observer

    // save the result via the concrete class
    var results = this.getInteractionResults();
    this.saveInteractionResults(results, interactionName); // concrete method
};

/**
 * Fetches interaction results.
 * @todo the results must be saved only for the first time, the logic must be on the interaction level (set result only for the first time)
 * @param interactionName
 * @returns {*}
 */
AbstractStorageDOA.prototype.getInteractionResults = function(interactionName) {
    console.log("DAO [abstractStorage] - getInteractionResults " + interactionName);
    var results = 'TODO';
    return results;
};

/**
 * Iterates through model to define the current score (percents complete).
 */
AbstractStorageDOA.prototype.calculateScore = function() {
    var percents = 0;
    var interactionsComplete = 0;
    var totalInteractions = 0;
    var score = {};
    for (var interaction in App.lesson.model.progress) {
        // @todo set interactions completed
        // ++interactionsComplete;
        ++totalInteractions;
    }
    percents = Math.round((interactionsComplete / totalInteractions) * 100);
    score.percentsComplete = percents;
    score.currentInteraction = interactionsComplete;
    return score;
};

/**
 * Starts the session timer.
 */
AbstractStorageDOA.prototype.startSessionTime = function() {
    this.startDate = new Date().getTime();
};

/**
 * Get session time.
 * @returns string (CMITimespan)
 */
AbstractStorageDOA.prototype.getSessionTime = function() {
    var formattedTime;
    if (this.startDate !== null) {
        var currentDate = new Date().getTime();
        var elapsedSeconds = ( (currentDate - this.startDate) / 1000 );
        formattedTime = this.convertTotalSeconds( elapsedSeconds );
    } else {
        formattedTime = "00:00:00.0";
    }
    return formattedTime;
};

/**
 * Converts seconds into hours, minutes, and seconds in
 * CMITimespan type format - HHHH:MM:SS.SS (Hours has a max of 4 digits and min of 2 digits.
 * Copied from eXe SCOFunctions.
 */
AbstractStorageDOA.prototype.convertTotalSeconds = function(ts) {
    var sec = (ts % 60);

    ts -= sec;
    var tmp = (ts % 3600);  //# of seconds in the total # of minutes
    ts -= tmp;              //# of seconds in the total # of hours

    // convert seconds to conform to CMITimespan type (e.g. SS.00)
    sec = Math.round(sec*100)/100;

    var strSec = new String(sec);
    var strWholeSec = strSec;
    var strFractionSec = "";

    if (strSec.indexOf(".") != -1)
    {
        strWholeSec =  strSec.substring(0, strSec.indexOf("."));
        strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
    }

    if (strWholeSec.length < 2)
    {
        strWholeSec = "0" + strWholeSec;
    }
    strSec = strWholeSec;

    if (strFractionSec.length)
    {
        strSec = strSec+ "." + strFractionSec;
    }


    if ((ts % 3600) != 0 )
        var hour = 0;
    else var hour = (ts / 3600);
    if ( (tmp % 60) != 0 )
        var min = 0;
    else var min = (tmp / 60);

    if ((new String(hour)).length < 2)
        hour = "0"+hour;
    if ((new String(min)).length < 2)
        min = "0"+min;

    var rtnVal = hour+":"+min+":"+strSec;

    return rtnVal;
};

module.exports = AbstractStorageDOA;