module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files : {
                    'css/main.min.css' : 'src/scss/main.scss'
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'js/main.min.js' : 'src/js/main.js'
                }
            }
            
        },
        watch: {
            css: {
                files: 'src/scss/*.scss',
                tasks: ['sass']
            },
            script: {
                files: 'src/js/*.js',
                tasks: ['uglify'],
            
                options: {
                    spawn: false
                }
            }
        }
    });
    
    //load plugin
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //watch/ run task
    grunt.registerTask('default', ['watch']);
};