// @todo review EcmaScript inheritence and interface best practices
ScormDAO.prototype = new AbstractStorageDOA();
ScormDAO.prototype.constructor = ScormDAO;

/**
 * Concrete DAO class that implements SCORM.
 * @constructor
 */
function ScormDAO() {
   this.scormHelper = new ScormHelper(); // ScormHelper composition
}

/**
 * Gets the progress.
 * @todo semantic between session and lesson
 * @todo possible refactoring with abstract
 */
ScormDAO.prototype.getSessionProgression = function() {
    console.log("DA0 [scorm] - getSessionProgression");
    this.scormHelper.initScormConnection();
    var progressStr = this.scormHelper.getScormSuspendData();
    if(progressStr !== "" && progressStr !== null && typeof progressStr !== 'undefined') {
        // @todo refactoring to use global StoryMap or this mapProgress
        console.log('Fetch storage progression.');
        var progressJSON = JSON.parse(progressStr);
        App.lesson.model.setProgress(progressJSON);
    }else{
        console.log('Progress does not exists, initializing one.');
        App.lesson.model.initialize();
    }
};

/**
 * Persistence for map progress.
 */
ScormDAO.prototype.saveSessionProgression = function() {
    console.log("DA0 [scorm] - saveSessionProgression");
    var progressStr = JSON.stringify(StoryMap.progress.model.progress);
    this.scormHelper.setScormSuspendData(progressStr);
};

/**
 * Saves the current interaction a lesson location.
 * @param currentInteraction
 */
ScormDAO.prototype.saveCurrentInteraction = function(currentInteraction) {
    this.scormHelper.setScormLessonLocation(currentInteraction);
};

/**
 * Saves the results for an interaction.
 * @param results
 * @param interactionName
 */
ScormDAO.prototype.saveInteractionResults = function(results, interactionName) {
    console.log("DA0 [scorm] - saveInteractionResults");
    /*
    if(typeof localStorage !== 'undefined') {
        // @todo
    }
    */
};

/**
 * Saves score.
 */
ScormDAO.prototype.saveScore = function(score){
    console.log("DA0 [scorm] - saveScore");
    this.scormHelper.setScormScore(score);
};

/**
 * Saves session time.
 */
ScormDAO.prototype.saveSessionTime = function(time){
    console.log("DA0 [scorm] - saveSessionTime");
    this.scormHelper.setScormSessionTime(time);
};

/**
 * Closes the SCORM connection.
 */
ScormDAO.prototype.endConnection = function(){
    this.scormHelper.endScormConnection();
};

/**
 * Debug information.
 */
ScormDAO.prototype.getDebugInfo = function(){
    console.log("DA0 [scorm] - getDebugInfo");
    if(typeof localStorage !== 'undefined') {
        console.log('--- MAP SESSION NUMBER ---');
        console.log(localStorage.getItem('nbr_sessions'));
    }
    console.log('--- STUDENT NAME ---');
    console.log(this.scormHelper.getScormStudentName());
    console.log('--- PROGRESS ---');
    console.log(this.scormHelper.getScormSuspendData());
    console.log('--- CURRENT INTERACTION ---');
    console.log(this.scormHelper.getScormLessonLocation());
    console.log('--- SCORE ---');
    console.log(this.scormHelper.getScormScore());
    console.log('--- SESSION TIME ---');
    console.log(this.scormHelper.getScormSessionTime());
    console.log('--- TOTAL TIME ---');
    console.log(this.scormHelper.getScormTotalTime());
};