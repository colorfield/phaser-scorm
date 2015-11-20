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
            "path": "assets/images/"
        }
    },
    "modules": {
        "wrapper": false,
        "definition": false
    }
}