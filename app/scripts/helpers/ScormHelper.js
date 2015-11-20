/**
 * Encapsulates SCORM common operations.
 * Delegates the heavy lifting to pipwerks SCORM API wrapper.
 * @see https://github.com/pipwerks/scorm-api-wrapper
 * @constructor
 */
var ScormHelper = function() {
    this.scorm = pipwerks.SCORM;
    this.LMSConnected = false; // boolean
};

// @todo implement interaction results
// @todo unit test for a SCORM lesson

ScormHelper.prototype.SCORM_VERSION = "1.2";
// @todo locale
ScormHelper.prototype.SCORM_LMS_CONNECTION_ERROR = 'Could not connect to the LMS';

/**
 * Intializes a SCORM connection based on a version of the protocol.
 */
ScormHelper.prototype.initScormConnection = function() {
    if(!this.LMSConnected){
        this.scorm.version = this.SCORM_VERSION;
        this.LMSConnected = this.scorm.init();
    }
};

/**
 * Wrapper for SCORM.set operations.
 * Checks if connection is initialized and allows to hook debug information.
 * @param SCORM param
 * @param value
 * @see SCORM allowed parameters http://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/
 * @returns boolean
 */
ScormHelper.prototype.scormSet = function(param, value) {
    var succeed = false;
    if(this.LMSConnected == true) {
        succeed = this.scorm.set(param, value);
    }else{
        alert(this.SCORM_LMS_CONNECTION_ERROR);
    }
    return succeed;
};

/**
 * Wrapper for SCORM.get operations, allows to hook debug information.
 * @param param
 * @returns {*}
 */
ScormHelper.prototype.scormGet = function(param) {
    var value = null;
    if(this.LMSConnected == true) {
        value = this.scorm.get(param);
    }else{
        alert(this.SCORM_LMS_CONNECTION_ERROR);
    }
    return value;
};

/**
 * Terminates a SCROM connection.
 * @returns boolean
 */
ScormHelper.prototype.endScormConnection = function() {
    var succeed = this.scorm.quit();
    return succeed;
};

/**
 * Sets a lesson as completed.
 * @returns boolean
 */
ScormHelper.prototype.setScormLessonComplete = function() {
    var succeed = this.scormSet("cmi.core.lesson_status", "completed");
    return succeed;
};

/**
 * Gets the student name.
 * @returns string
 */
ScormHelper.prototype.getScormStudentName = function() {
    var name = this.scormGet("cmi.core.student_name");
    return name;
};

/**
 * Saves the map status as suspend data.
 * @param {*}
 */
ScormHelper.prototype.setScormSuspendData = function(data) {
    this.scormSet('cmi.suspend_data', data); // json string model
    // Ensure the LMS persists (saves) what was just sent
    //scorm.save(); // @todo ?
};

/**
 * Gets the map status as suspend data.
 * @returns {*}
 */
ScormHelper.prototype.getScormSuspendData = function() {
    var data = this.scormGet('cmi.suspend_data');
    return data;
};

/**
 * Sets SCORM score.
 * @param score
 * @returns boolean
 */
ScormHelper.prototype.setScormScore = function(score) {
    var succeed = this.scormSet("cmi.core.score.raw", score);
    return succeed;
};

/**
 * Gets SCORM score.
 * @returns {*}
 */
ScormHelper.prototype.getScormScore = function() {
    var score = this.scormGet("cmi.core.score.raw");
    return score;
};

/**
 * Sets SCORM lesson location.
 * Current interaction in this context.
 * @param location
 * @returns boolean
 */
ScormHelper.prototype.setScormLessonLocation = function(location) {
    var succeed = this.scormSet("cmi.core.lesson_location", location);
    return succeed;
};

/**
 * Gets SCORM lesson location.
 * Current interaction in this context.
 * @returns {*}
 */
ScormHelper.prototype.getScormLessonLocation = function() {
    var location = this.scorm.get("cmi.core.lesson_location");
    return location;
};

/**
 * Sets SCORM session time.
 * @param time
 * @returns boolean
 */
ScormHelper.prototype.setScormSessionTime = function(time) {
    var succeed = this.scormSet("cmi.core.session_time", time);
    return succeed;
};

/**
 * Gets SCORM session time.
 * @returns {*}
 */
ScormHelper.prototype.getScormSessionTime = function() {
    var time = this.scormGet("cmi.core.session_time");
    return time;
};

/**
 * Gets SCORM total time (read-only element).
 * @see http://www.vsscorm.net/2009/07/14/step-17-cmi-core-total_time-and-cmi-core-session_time/
 * @returns {*}
 */
ScormHelper.prototype.getScormTotalTime = function() {
    var time = this.scormGet("cmi.core.total_time");
    return time;
};