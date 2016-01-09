module.exports = function(grunt) {

    // Streamlines the loading of grunt-* plugins
    require('load-grunt-tasks')(grunt); 
    
    // Logs timing information in the terminal running a Grunt task
    require('time-grunt')(grunt);

    // Initialise the Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * @name grunt-contrib-sass
         * @description Used for compiling SASS files into CSS
         * @see https://www.npmjs.com/package/grunt-contrib-sass
         */
        sass: {
            compress: {
                options: {
                    style: 'compressed',
                    sourcemap: 'auto',
                    precision: 2
                },
                files: {
                    '../css/styles.min.css': 'scss/source.scss'
                },
            }
        },


        /**
         * @name grunt-contrib-uglify
         * @description Minifies JS. Has nice options like mangle (obfuscate) and drop_console (remove all console.log)
         * @see https://www.npmjs.com/package/grunt-contrib-uglify
         */
        uglify: {
            options: {
                mangle: true,
                compress: {
                    drop_console: false
                }
            },
            minifyjs: {
                files: {
                    '../js/scripts.min.js': ['../js/scripts.js']
                }
            }
        }, 


        /**
         * @name grunt-import
         * @description Used to stitch files together by importing files into other files
         * @see https://www.npmjs.com/package/grunt-import
         */
        import: {
            stitch: {
                files: {
                    '../js/scripts.js': 'js/source.js'
                }
            } 
        },


        /**
         * @name grunt-contrib-watch
         * @description Used to run tasks automatically when watched files change
         * @see https://www.npmjs.com/package/grunt-contrib-watch
         */
        watch: {
            sass: {
                files: ['scss/**/*.scss'],
                tasks: ['sass:compress']
            },
            uglify: {
                files: ['../js/scripts.js'],
                tasks: ['uglify:minifyjs']
            },
            import: {
                files: ['js/**/*.js'],
                tasks: ['import:stitch']
            }
        }
    });

    // Register Grunt tasks here
    grunt.registerTask('default', 'watch');
};