var gulp = require('gulp');

var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');
var Server = require('karma').Server;

// Use for debugging
var gutil = require('gulp-util');
var debug = require('gulp-debug');

// Source and Dist Directories
var bases = {
    dist: 'dist/',
    src: 'src/'
};

// Main paths
var paths = {
    scripts: ['app/**/*.js', '!app/**/*.spec.js'],
    html: ['**/*.html', 'index.html'],
    libs: ['scripts/**/*.min.js', 'scripts/**/*.js'],
    content: ['content', '!content/scss'],
    sass: ['content/scss/**/*.scss'],
    index: ['index.html'],
    css: ['**/*.css']
};

//Clean dist folder
gulp.task('clean', function() {
    return gulp.src(bases.dist).pipe(clean());
});

//jshint, uglify and min js
gulp.task('scripts', ['clean'], function() {
    gulp.src(paths.scripts, {
            cwd: bases.src
        })
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(ngAnnotate())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(bases.dist + 'app'));
});

//compile and concat css
gulp.task('sass', ['clean'], function() {
    return gulp.src(paths.sass, {
            cwd: bases.src
        })
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(bases.dist + 'content'));
});

//copy html, libs and content files from src to dist
gulp.task('copy', ['sass'], function() {
    gulp.src(paths.html, {
            cwd: bases.src
        })
        .pipe(gulp.dest(bases.dist));

    gulp.src(paths.libs, {
            cwd: bases.src
        })
        .pipe(gulp.dest(bases.dist + 'scripts'));

    gulp.src(paths.content, {
            cwd: bases.src
        })
        .pipe(gulp.dest(bases.dist));
});

// Inject css and js files into index for dist
gulp.task('indexDist', ['copy', 'scripts'], function() {
    setTimeout(function() {
        gulp.src(paths.index, {
                cwd: bases.dist
            })
            .pipe(inject(gulp.src(paths.libs, {
                cwd: bases.dist,
                read: false
            }), {
                name: 'libs',
                relative: true,
                ignoreParth: 'src'
            }))
            .pipe(inject(gulp.src(paths.scripts, {
                cwd: bases.dist,
                read: false
            }), {
                relative: true,
                ignoreParth: 'src'
            }))
            .pipe(inject(gulp.src(paths.css, {
                cwd: bases.dist,
                read: false
            }), {
                relative: true,
                ignoreParth: 'src'
            }))
            .pipe(gulp.dest(bases.dist));
    }, 500);
});

// Inject css and js files into index for src
gulp.task('indexSrc', ['copy'], function() {
    gulp.src(paths.index, {
            cwd: bases.src
        })
        .pipe(inject(gulp.src(paths.libs, {
            cwd: bases.src,
            read: false
        }), {
            name: 'libs',
            relative: true,
            ignoreParth: 'src'
        }))
        .pipe(inject(
            gulp.src(paths.scripts, {
                cwd: bases.src
            })
            .pipe(angularFilesort()), {
                relative: true
            }
        ))
        .pipe(inject(gulp.src(paths.css, {
            cwd: bases.dist,
            read: false
        }), {
            relative: true,
            ignoreParth: 'src'
        }))
        .pipe(gulp.dest(bases.src));
});

// Run with 'gulp test' - Runs unit tests
gulp.task('test', function(done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

// Run with 'gulp watch' - watches sass files and checks if new files are added and will insert into src index
gulp.task('watch', function() {

    gulp.watch('src/content/scss/**/*.scss', ['sass']);
    gulp.watch('src/**/*', function(event) {
        if (event.type === "added" || event.type === "deleted") {
            gulp.src(paths.index, {
                    cwd: bases.src
                })
                .pipe(inject(gulp.src(paths.libs, {
                    cwd: bases.src,
                    read: false
                }), {
                    name: 'libs',
                    relative: true
                }))
                .pipe(inject(
                    gulp.src(paths.scripts, {
                        cwd: bases.src
                    })
                    .pipe(angularFilesort()), {
                        relative: true
                    }
                ))
                .pipe(inject(gulp.src(paths.css, {
                    cwd: bases.dist,
                    read: false
                }), {
                    relative: true,
                    ignoreParth: 'src'
                }))
                .pipe(gulp.dest(bases.src));
        }
    });
});

// Run with 'gulp' - default task. Runs all tasks and creates dist folder
gulp.task('default', ['clean', 'scripts', 'sass', 'copy', 'indexDist', 'indexSrc']);