var config = {
  src:  'src/public',
  dist: 'dist/public',
  node: 'node_modules'
}

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    config: config,
    copy: {
      dist: {
       files: [{
          expand: true,
          cwd: '<%= config.src %>',
          src: ['js/**', 'css/**', 'img/**', 'libs/**', 'views/**'],
          dest: '<%= config.dist %>'
       }]
      },
      init: {
      files: [{
          expand: true,
          cwd: '<%= config.node %>/angular',
          src: ['angular.min.js'],
          dest: '<%= config.src %>/libs'
      },{
          expand: true,
          cwd: '<%= config.node %>/angular-route',
          src: ['angular-route.min.js'],
          dest: '<%= config.src %>/libs'
      },
      {
          expand: true,
          cwd: '<%= config.node %>/angular-animate',
          src: ['angular-animate.min.js'],
          dest: '<%= config.src %>/libs'
       },
      {
          expand: true,
          cwd: '<%= config.node %>/bootstrap/dist/js/',
          src: ['bootstrap.min.js'],
          dest: '<%= config.src %>/libs'
       },
       ]        
      } 
    /*  
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */ //'
      /*},*/
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('dist', ['copy:dist']);
  grunt.registerTask('init', ['copy:init']);

  grunt.registerTask('default', ['init', 'dist']);
};