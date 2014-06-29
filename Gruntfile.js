module.exports = function (grunt) {
	'use strict';

	// Load grunt tasks
	require('load-grunt-tasks')(grunt);

  grunt.config('pkg', grunt.file.readJSON('package.json'));
	grunt.initConfig({

		// Ejs render
		render: {
			dev: {
				files: {
          'dist/index.html': ['src/index.html']
				},
				options: {
					data: {
						dev: true,
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
					imagesDir: 'assets/images',
					environment: 'development'
				}
			},
			dist: {
				options: {
					sassDir: 'src/assets/sass',
					cssDir: 'src/assets/css',
					imagesDir: 'assets/images',
					outputStyle: 'compressed',
					noLineComments: true,
					environment: 'production'
				}
			}
		},

		// Watch dev tasks
		watch: {
			templates: {
				files: ['src/templates/*'],
				tasks: ['render:dev']
			},

			sass: {
				files: [
					'src/assets/sass/*.sass',
					'src/assets/sass/**/*.sass',
				],
				tasks: ['compass:dev']
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
        src: 'assets/images/*',
        dest: 'dist/'
      },
      js: {
        expand: true,
        cwd: 'src/',
        src: ['assets/javascripts/*.js', 'assets/javascripts/**/*.js'],
        dest: 'dist/'
      },
      misc: {
        expand: true,
        cwd: 'src/',
        src: ['favicon.ico', 'robots.txt'],
        dest: 'dist/'
      }
    },
	});

	// Tasks
  grunt.registerTask('develop', [
    'connect',
    'watch'
  ]);

};