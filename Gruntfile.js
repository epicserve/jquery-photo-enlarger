
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

        copy: {
            gh_pages: {expand: true, cwd: 'example/', src: ['**'], dest: '_site/'}
        }

    });

    grunt.registerTask('deploy', ['copy:gh_pages', 'githubPages:target']);

    grunt.registerTask('default', []);

};
