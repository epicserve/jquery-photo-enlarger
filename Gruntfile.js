
'use strict';

module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        dirs: {
            src: 'example',
            dist: 'dist'
        },

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
                    base: '<%= dirs.src %>'
                }
            }
        },

        copy: {
            gh_pages: {expand: true, cwd: '<%= dirs.src %>/', src: ['**'], dest: '_site/'},
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.src %>/js/jquery-photo-enlarger/',
                        dest: '<%= dirs.dist %>',
                        src: ['img/**']
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.src %>/js/jquery-photo-enlarger/',
                        dest: '<%= dirs.dist %>/js/',
                        src: ['*.js']
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.src %>/js/jquery-photo-enlarger/css/',
                        dest: '<%= dirs.dist %>/css/',
                        src: ['*.css']
                    }
                ]
            }
        },

        clean: {
            dist: {
                files: [{dot: true, src: ['.tmp', '<%= dirs.dist %>']}]
            },
            tmp: {
                files: [{dot: true, src: ['.tmp']}]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= dirs.src %>/js/**/*.js'
            ]
        },

        useminPrepare: {
            options: {
                dest: '<%= dirs.dist %>'
            },
            html: '<%= dirs.src %>/index.html'
        },

        usemin: {
            options: {
                assetsDirs: ['<%= dirs.dist %>']
            },
            html: ['<%= dirs.dist %>/{,*/}*.html'],
            css: ['<%= dirs.dist %>/css/{,*/}*.css']
        }

    });

    grunt.registerTask('server', 'connect:server');

    grunt.registerTask('deploy', ['jshint', 'copy:gh_pages', 'githubPages:target']);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'clean:tmp'
    ]);

    grunt.registerTask('default', []);

};
