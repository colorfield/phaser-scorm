# phaser-scorm

A boilerplate Phaser application oriented to e-learning that can be deployed in a LMS (Learning Management System, like Moodle) as a SCORM package.
E-learning exposed via endless slides tends to be boring, the purpose of this starter kit is to expose small HTML5 games (quiz forms, fill blanks, ...) via an immersive Phaser interface. The SCORM package is bundled as a single lesson.

## The following features are covered
* A DAO factory to allow debugging in localStorage before implementation in SCORM 
* A GameController factory to implement the logic of several games under a common interface
* An Interaction class that handles a state per instance (current, passed, not available) and creates the GameController factory. It can also be used as a router for other pieces of content (videos, texts)
* A state for each interaction 
* A timeline to give a hint on the game progression to the "student player"
* Phaser states
* Localization.

### DAO interface
* createSession
* saveSession
* closeSession

### GameController interface
* dispatchGameComplete
* showResults
* disableGame
