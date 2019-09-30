module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "babel": {
      options: {
        /*livereload: true, // Adding <script src="http://localhost:35729/livereload.js"></script> to index.html*/
      },
      dist: {
        files: {
          "public/app.js": "src/app.js"
        }
      }
    },
    watch: {
      files: ['src/**.js'],
      tasks: ['babel']
    }
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['babel']);

};