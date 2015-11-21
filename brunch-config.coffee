# Note: modernizr and requirejs are missing the main property in bower.json
# @see https://github.com/paulmillr/read-components#README
module.exports = config:
  paths:
    watched: ['app']
    public: 'public'
  files:
    javascripts:
      joinTo:
        'scripts/vendor.js': /^bower_components/
        'scripts/app.js': /^app/
      #order:
      #  before: [
      #    'bower_components/phaser/build/phaser.js'
      #  ]
      #  after: [
      #    'app/app.js'
      #  ]
    stylesheets:
      joinTo: 'app.css'
    templates:
      joinTo: 'scripts/app.js'
  conventions:
    assets: /assets[\\/]/
  plugins:
    imageoptimizer:
      smushit: true,
      path: 'app/images/'
  server:
    run: 'yes'
    port: 4444