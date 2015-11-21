# Note: modernizr and requirejs are missing the main property in bower.json
# @see https://github.com/paulmillr/read-components#README
module.exports = config:
  paths:
    watched: ['app']
    public: 'public'
  files:
    javascripts:
      joinTo:
        'scripts/libraries.min.js': /^(?!app\/)/
        #'scripts/libraries.min.js': /^bower_components/
        'scripts/app.min.js': /^app\//
      order:
        after: [
          'app/app.js'
        ]
    stylesheets: joinTo: 'app.min.css'
  conventions:
    assets: /assets[\\/]/
  plugins:
    imageoptimizer:
      smushit: true,
      path: 'app/images/'
  server:
    run: 'yes'
    port: 4444