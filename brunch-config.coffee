exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^vendor/
      order:
        # things like bootstrap require this, so we have it go first
        before: ['vendor/jquery-1.11.0.min.js']
    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^vendor/
      order:
        after: ['vendor/bootstrap.css', 'vendor/bootstrap-theme.css']
    templates:
      joinTo:
        '/dev/null': /.*\.static\.jade/
  plugins:
    autoReload:
      enabled:
        assets: on
    jade:
      options:
        pretty: yes
      locals:
        # these need to match the configuration in the files element above
        appJs: '/js/app.js'
        vendorJs: '/js/vendor.js'
        appCss: '/css/app.css'
        vendorCss: '/css/vendor.css'
    static_jade:
      extension: ".static.jade"
      # really, I just want the rendered output to go into the 
      # well... rendered output
      #asset: "public/"
  overrides:
    production:
      optimize: true
      sourceMaps: false
      plugins:
        jade:
          options:
            pretty: no
