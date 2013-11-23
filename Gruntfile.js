
'use strict';

module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        githubPages: {
            target: {
                options: {
                    // The default commit message for the gh-pages branch
                    commitMessage: 'Github pages update'
                },
                // The folder where your gh-pages repo is
                src: '_site'
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    keepalive: true,
                    open: true,
                    base: 'example'
                }
            }
        },

        copy: {
            gh_pages: {expand: true, cwd: 'example/', src: ['**'], dest: '_site/'}
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'example/js/**/*.js'
            ]
        }

    });

    grunt.registerTask('server', 'connect:server');

    grunt.registerTask('deploy', ['jshint', 'copy:gh_pages', 'githubPages:target']);

    grunt.registerTask('default', []);

};
