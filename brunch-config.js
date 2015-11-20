/**
 * Note: modernizr and requirejs are missing the main property in bower.json
 * @see https://github.com/paulmillr/read-components#README
 */
exports.config = {
    "paths": {
        "watched": ["app"],
        "public": "public" // default brunch dist
    },
    "files": {
        "stylesheets": {
            "joinTo": "styles/app.min.css",
            "order": {
                "before": ["app/styles/main.css"]
            }
        },
        "javascripts": {
            "joinTo": "scripts/app.min.js"
        }
    },
    "conventions": {
        "assets": /assets[\\/]/
    },
    "plugins": {
        "imageoptimizer": {
            "smushit": true,
            "path": "app/images/"
        }
    },
    "modules": {
        "wrapper": false,
        "definition": false
    },
    "server": {
        "run": "yes",
        "port": 4444
    }
}