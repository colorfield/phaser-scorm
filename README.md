# phaser-scorm

A boilerplate Phaser application, *still under development*, oriented to e-learning that can be deployed in a LMS (Learning Management System, like Moodle) as a SCORM package.
E-learning exposed via endless slides tends to be boring, the purpose of this starter kit is to expose small HTML5 games (quiz forms, fill blanks, ...) via an immersive Phaser interface. The SCORM package is bundled as a single lesson.
Interactions can be exposed via Phaser (let's say: discussion with other students, platformer, ...) or via a partial HTML overlay (more suitable for form interactions like quiz, sort, fill blanks, ...).

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
 
## Getting started

### Setup
You need Bower (package manager), Brunch (build) + Brunch plugins (concat, minify, ...) and Nightwatch (unit tests).
If not installed yet, get [Node.js](https://nodejs.org/en/download/) and install Bower and Brunch globally :
```
npm install -g bower
npm install -g brunch
npm install -g nightwatch
````
[Nightwatch documentation](https://github.com/hayesmaker/phase-2-e)

Once done, cd in the cloned directory then
* get the project dependencies with Bower
```bower install```
* install the Node modules (Brunch plugins)
```npm install --save-dev```


### Build
Then you can begin to code and build, basic Brunch operations are 
* `brunch build` (or `brunch b`) for a one time build
* `brunch watch`(or `brunch w`) to watch
There are dozens of other features that are covered on the [Brunch.io documentation](https://github.com/brunch/brunch/tree/master/docs), most common are `brunch build --production` (deploys for production environment), `brunch watch --server` (provides a server if you do not have / want a Nginx or Apache stack), ...

*Troubleshooting*
During the build, Brunch can yield "Error: Component JSON file ".../bower_components/#/.bower.json" 
must have 'main' property.", @see https://github.com/paulmillr/read-components#README
