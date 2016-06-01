module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: './build/'
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            dest: './build/app/',
            cwd: './src/app/',
            src: ['index.html']
          },
          {
            expand: true,
            dest: './build/app/img',
            cwd: './src/app/img',
            src: ['**/*']
          },
          {
            expand: true,
            dest: './build/',
            cwd: './src/',
            src: ['*.js']
          },
          {
            expand: true,
            dest: './build/app/lib/react/',
            cwd: './node_modules/react/dist/',
            src: ['*.js']
          },
          {
            expand: true,
            dest: './build/app/lib/react-dom/',
            cwd: './node_modules/react-dom/dist/',
            src: ['*.js']
          },
          {
            expand: true,
            dest: './build/app/lib/',
            cwd: './lib',
            src: ['**/*', '!**/*.scss']
          },
          {
            expand: true,
            dest: './build/app/lib/',
            cwd: './bower_components',
            src: ['**/*', '!bootstrap-sass/**']
          }
        ]
      }
    },
    sass: {
      dist: {
        options: {
          loadPath: './bower_components/bootstrap-sass/assets/stylesheets'
        },
        files: [
          {
            './build/app/main.css': './src/app/styles/main.scss'
          },
          {
            './build/app/lib/font-awesome/font-awesome.css': './lib/font-awesome/font-awesome.scss'
          }
        ]
      }
    },
    browserify: {
      dist: {
        options: {
          debug: true,
          transform: [
            ['babelify', {'presets': ['es2015', 'react']}]
          ]
        },
        files: { 'build/app/js/dist.js': 'src/app/**/*.jsx' }
      }
    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: './build/server.js'
        }
      }
    },
    watch: {
      options: {livereload: true},
      scripts: {
        options: { spawn: false },
        files: ['./src/**/*.js', './src/**/*.jsx', '!./src/server.js'],
        tasks: ['copy:main', 'browserify', 'express:dev']
      },
      server: {
        options: { spawn: false },
        files: ['./src/server.js'],
        tasks: ['copy:main', 'express:dev']
      },
      sass: {
        options: { spawn: false },
        files: ['./src/app/styles/**/*.scss'],
        tasks: ['copy:main', 'sass', 'express:dev']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Register tasks
  grunt.registerTask('default', ['express:dev', 'watch']);
  grunt.registerTask('build', ['clean:all', 'copy:main', 'browserify', 'sass']);
};