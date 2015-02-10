module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.config('pkg', grunt.file.readJSON('package.json'));
  grunt.initConfig({
    // create a banner name
    banner_name: '/*! ' + grunt.config('pkg').name + ' - v ' + grunt.config('pkg').version + ' */',

    // Ejs render
    render: {
      dev: {
        files: {
          'dist/index.html': ['src/index.html']
        },
        options: {
          data: {
            dev: true,
            // Flag for vendor 
            // change it if you will use vendor
            has_vendor: false,
            pkg: grunt.config('pkg')
          }
        }
      },
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        },
        options: {
          data: {
            dev: false,
            has_vendor: false,
            pkg: grunt.config('pkg')
          }
        }
      }
    },

    // Image minification
    imagemin: {
      main: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'assets/images/*.{png,jpg,gif,svg}',
          dest: 'dist'
        }]
      }
    },

    // Compass render
    compass: {
      dev: {
        options: {
          sassDir: 'src/assets/sass',
          cssDir: 'src/assets/css',
          imagesDir: 'src/assets/images',
          outputStyle: 'nested',
          environment: 'development',
          force: true,
          raw: 'http_generated_images_path = \'/assets/images\''
        }
      },
      dist: {
        options: {
          sassDir: 'src/assets/sass',
          cssDir: 'src/assets/css',
          imagesDir: 'dist/assets/images',
          outputStyle: 'compressed',
          noLineComments: true,
          environment: 'production',
          raw: 'http_generated_images_path = \'/assets/images\''
        }
      }
    },

    // Watch dev tasks
    watch: {
      templates: {
        files: [
          '*.json',
          'src/templates/*',
          'src/*.html'
       ],
        tasks: ['render:dev']
      },

      sass: {
        files: [
          'src/assets/sass/*.sass',
          'src/assets/sass/**/*.sass',
        ],
        tasks: [
          'compass:dev',
          'copy:css'
        ]
      },

      scripts: {
        files: [
          'src/assets/javascripts/*.js',
          'src/assets/javascripts/**/*.js',
        ],
        tasks: [
          'copy:scripts',
          'concat',
        ]
      },

      images: {
        files: [
          'src/assets/images/*',
        ],
        tasks: [
          'copy:images'
        ]
      }
    },

    // Static Webserver
    connect: {
      server: {
        options: {
          port: 8180,
          base: 'dist'
        }
      }
    },

    // HTML Minify
    htmlmin: {
      compile: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          keepClosingSlash: false,
          caseSensitive: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: 'src/',
        src: 'assets/fonts/*',
        dest: 'dist/'
      },
      images: {
        expand: true,
        cwd: 'src/',
        src: 'assets/images/**',
        dest: 'dist/'
      },
      misc: {
        expand: true,
        cwd: 'src/',
        src: [
          'favicon.ico',
          'robots.txt'
        ],
        dest: 'dist/'
      },
      css: {
        expand: true,
        cwd: 'src/',
        src: [
          'assets/css/*',
          'assets/css/**/*.css',
        ],
        dest: 'dist/'
      },
      scripts: {
        expand: true,
        cwd: 'src/',
        src: [
          'assets/javascripts/*',
          'assets/javascripts/**/*.js',
        ],
        dest: 'dist/'
      },

      // vendor: {
      //   expand: true,
      //   cwd: 'bower_components/',
      //   src: [
      //     // keep your js order
      //     'jquery/dist/jquery.js',
      //   ],
      //   dest: 'dist/assets/bower_components'
      // }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          // keep your javascript order here
          'src/assets/javascripts/*.js',
        ],
        dest: 'dist/assets/javascripts/main.js'
      },
    },

    // CSS Minify
    cssmin: {
      compile: {
        files: {
          'dist/assets/css/main.css': [
            'src/assets/css/*.css',
            'src/assets/css/**/*.css',
            '!src/assets/css/normalize.css'
          ],

          'dist/assets/css/normalize.css': [
            'src/assets/css/normalize.css'
          ]
        }
      }
    },

    // Uglify
    uglify: {
      compile: {
        files: {
          // common files
          'dist/assets/javascripts/main.js': [
            // keep your javascript order here
            'src/assets/javascripts/*.js',
          ],

          // vendor files
          // 'dist/assets/javascripts/vendor.js': [
          //   // keep your javascript vendor files in order here
          //   'bower_components/jquery/dist/jquery.min.js',
          // ]
        }
      }
    },

    cacheBust: {
      assets: {
        files: [{
          src: ['dist/index.html']
        }]
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },

    clean: {
      build: [
        '*.zip',
        'dist'
      ],

      dev: [
        'src/assets/css/',
        'dist/assets/css/'
      ]
    },

    compress: {
      main: {
        options: {
          archive: grunt.config('pkg').name + '-v' + grunt.config('pkg').version + '.zip'
        },
        files: [
          {
            src: ['dist/**']
          }
        ]
      }
    }

  });

  // Tasks
  grunt.registerTask('copy:dev', [
    'copy'
  ]);

  grunt.registerTask('copy:build', [
    'copy:images',
    'copy:misc',
    'copy:fonts'
  ]);

  grunt.registerTask('develop', [
    'clean:dev',
    'render:dev',
    'copy:images',
    'compass:dev',
    'concat',
    'copy',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'render:dist',
    'compass:dist',
    'cssmin',
    'uglify',
    'imagemin',
    'cacheBust',
    'htmlmin',
    'copy:build',
    'compress'
  ]);

};
