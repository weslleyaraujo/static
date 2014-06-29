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
          'compiled/index.html': ['src/index.html']
				},
				options: {
					data: {
						dev: true,
						pkg: grunt.config('pkg')
					}
				}
			}
		},

		watch: {
			templates: {
				files: ['src/templates/*'],
				tasks: ['render:dev']
			}
		}

	});

};
