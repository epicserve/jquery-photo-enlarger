
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
            },
            test: {
                options: {
                    base: ['tests', '<%= dirs.src %>']
                }
            },
            test_server: {
                options: {
                    keepalive: true,
                    open: true,
                    base: ['tests', '<%= dirs.src %>']
                }
            }
        },

        copy: {
            site: {
                files: [
                    {expand: true, cwd: '<%= dirs.dist %>/', src: ['**'], dest: '_site/'},
                    {expand: true, cwd: '.tmp/', src: ['*.html'], dest: '_site/'},
                    {expand: true, cwd: '<%= dirs.src %>/css/', src: ['main.css'], dest: '_site/css/'},
                    {expand: true, cwd: '<%= dirs.src %>/js/', src: ['main.js'], dest: '_site/js/'}
                ]
            },
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
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.src %>/',
                        dest: '.tmp/',
                        src: ['*.html']
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
            },
            site: {
                files: [{dot: true, src: ['_site/*.html', '_site/css', '_site/js', '_site/img']}]
            },
            vendor_files: {
                files: [{dot: true, src: ['<%= dirs.dist %>/css/boo*', '<%= dirs.dist %>/js/vendor*']}]
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

        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        useminPrepare: {
            options: {
                dest: '<%= dirs.dist %>'
            },
            html: '<%= dirs.src %>/index.html'
        },

        uglify: {
            options: {
                preserveComments: 'some'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src %>/',
                    src: '*.html',
                    dest: '<%= dirs.dist %>'
                }]
            }
        },

        usemin: {
            options: {
                assetsDirs: ['<%= dirs.dist %>']
            },
            html: ['.tmp/{,*/}*.html'],
            css: ['<%= dirs.dist %>/css/{,*/}*.css']
        }

    });

    grunt.registerTask('server', 'connect:server');

    grunt.registerTask('deploy', ['build', 'githubPages:target']);

    grunt.registerTask('test_server', 'connect:test_server');

    grunt.registerTask('test', [
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'test',
        'jshint',
        'clean:dist',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'usemin',
        'clean:site',
        'copy:site',
        'clean:vendor_files',
        'clean:tmp'
    ]);

    grunt.registerTask('default', []);

};
