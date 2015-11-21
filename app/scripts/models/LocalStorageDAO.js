/**
 * Concrete DAO class that implements localStorage.
 * @constructor
 */
var LocalStorageDAO = function () {
    AbstractStorageDOA.call(this);
};

LocalStorageDAO.prototype = Object.create(AbstractStorageDOA.prototype);
LocalStorageDAO.prototype.constructor = LocalStorageDAO;

/**
 * Gets the progress.
 * @todo semantic between session and lesson
 * @todo possible refactoring with abstract
 */
LocalStorageDAO.prototype.getSessionProgression = function() {
    console.log("DA0 [localStorage] - getSessionProgression");
    if(typeof localStorage !== 'undefined') {
        if(!App.debug.disableStorage){
            var progressStr = localStorage.getItem('scorm_phaser_progress');
            if(progressStr !== "" && progressStr !== null && typeof progressStr !== 'undefined') {
                console.log('Fetch storage progression.');
                var progressJSON = JSON.parse(progressStr);
                App.lesson.model.setProgress(progressJSON);
            }else{
                console.log('Progress does not exists, initializing one.');
                App.lesson.model.initialize();
            }
        }
    }
};

/**
 * Persistence for map progress.
 */
LocalStorageDAO.prototype.saveSessionProgression = function() {
    console.log("DA0 [localStorage] - saveSessionProgression");
    if(!App.debug.disableStorage){
        if(typeof localStorage !== 'undefined') {
            var progressStr = JSON.stringify(StoryMap.progress.model.progress);
            localStorage.setItem('scorm_phaser_progress', progressStr);
        }
    }
};


LocalStorageDAO.prototype.saveCurrentInteraction = function(currentInteraction) {
    if(typeof localStorage !== 'undefined') {
        localStorage.setItem('scorm_phaser_interaction', currentInteraction);
    }
};

/**
 * Saves the results for an interaction.
 * @param results
 * @param interactionName
 */
LocalStorageDAO.prototype.saveInteractionResults = function(results, interactionName) {
    console.log("DA0 [localStorage] - saveInteractionResults");
    if(typeof localStorage !== 'undefined') {
        // @todo
    }
};

/**
 * Saves score.
 */
LocalStorageDAO.prototype.saveScore = function(score){
    console.log("DA0 [localStorage] - saveScore");
    if(typeof localStorage !== 'undefined') {
        localStorage.setItem('scorm_phaser_score', score);
    }
};

/**
 * Saves session time.
 */
LocalStorageDAO.prototype.saveSessionTime = function(sessionTime){
    console.log("DA0 [localStorage] - saveSessionTime");
    if(typeof localStorage !== 'undefined') {
        localStorage.setItem('scorm_phaser_session_time', sessionTime);
    }
};

/**
 * Closes the connection.
 * Empty declaration to comply interface.
 */
LocalStorageDAO.prototype.endConnection = function(){
};

/**
 * Debug information.
 */
LocalStorageDAO.prototype.getDebugInfo = function(){
    console.log("DA0 [localStorage] - getDebugInfo");
    if(typeof localStorage !== 'undefined') {
        console.log('--- SESSION NUMBER ---');
        console.log(localStorage.getItem('scorm_phaser_session'));
        console.log('--- PROGRESS ---');
        console.log(localStorage.getItem('scorm_phaser_progress'));
        console.log('--- CURRENT INTERACTION ---');
        console.log(localStorage.getItem('scorm_phaser_interaction'));
        console.log('--- SCORE ---');
        console.log(localStorage.getItem('scorm_phaser_score'));
        console.log('--- SESSION TIME ---');
        console.log(localStorage.getItem('scorm_phaser_session_time'));
    }
};

