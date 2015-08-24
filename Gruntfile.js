module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Compile sass
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'client/content/css/style.css': 'client/content/scss/style.scss'
                }
            }
        },
        // Watch files for changes
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true,
                },
            },
            scripts: {
                files: ['client/**/*.js', '*.js', '*.json'],
                tasks: ['jshint', 'uglify'],
                options: {
                  spawn: false,
                }
            }
        },
        //Local server
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'client',
                    livereload: true
                },
                dev: {
                    options: {
                        middleware: function(connect) {
                            return [
                                require('connect-livereload')(), // <--- here
                                checkForDownload,
                                mountFolder(connect, '.tmp'),
                                mountFolder(connect, 'app')
                            ];
                        }
                    }
                }
            }

        },
        //Lint js files
        jshint: {
            src: ['client/app/app.js', 'client/app/**/*.js'],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                ignores: ['client/app/app.min.js']
            }
        },
        //Minify css
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'client/content/css/style.css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'client/content/css',
                    ext: '.min.css'
                }]
            }
        },
        //Minify JS
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'client/app/app.min.js': ['client/app/app.js', 'client/app/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //Start local server and watch
    grunt.registerTask('default', ['connect', 'watch']);
};