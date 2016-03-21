module.exports = function(config) {
  config.set({
    files: [
      'src/scripts/angular.min.js',
      'src/scripts/angular-ui-router.js',
      'src/scripts/angular-mocks.js',
      'src/app/**/*.js',
      'src/app/**/*.html',
    ],
    frameworks: ['jasmine'],
    reporters: [
      'spec',
      'progress',
      'coverage',
      'bamboo'
    ],
    preprocessors: {
      'src/app/**/*.js': ['coverage'],
      'src/app/**/*.html': ['ng-html2js']
    },
    bambooReporter: {
      filename: 'mocha.json' //optional, defaults to "mocha.json"
    },
    plugins: [
      'karma-bamboo-reporter',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor'
    ],
    browsers: ['PhantomJS'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    ngHtml2JsPreprocessor: {
      moduleName: 'templates'
    },
  });
};
//npm install karma-bamboo-reporter
//npm install mocha-bamboo-reporter
//https://github.com/TheSharpieOne/karma-bamboo-reporter