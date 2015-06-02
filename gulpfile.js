var gulp = require('gulp');
var source = require('vinyl-source-stream'); 
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var jest = require('gulp-jest');

var externals = [
    { require: 'jquery/dist/jquery.min.js', expose: 'jquery'},        
    { require: 'react/dist/react.min.js', expose: 'react'},
    { require: 'react-intl', expose: 'react-intl'}        
];
 
gulp.task('app', function() {
    var bundler = browserify({
        entries: ['./public/scripts/main.js'], 
        transform: [reactify], 
        debug: true, 
        cache: {}, 
        packageCache: {},
        fullPaths: true
    });
    
    //bundler.plugin('minifyify', {map: 'main.map.json', output:'./public/build/main.map.json'});

    var watcher = watchify(bundler);    
    externals.forEach(function(x){
        watcher.external(x.expose);
    });    

    return watcher
        .on('update', function () { 
            var updateStart = Date.now();
            console.log('Updating!');
            watcher.bundle() 
            .pipe(source('main.js'))                    
            .pipe(gulp.dest('./public/build/'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle() 
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('libs', function () {
    var bundler = browserify({          
        debug: false
    });

    externals.forEach(function(x){
        bundler.require(x.require, {expose : x.expose});
    });   

    bundler.bundle() // Create the initial bundle when starting the task
        .pipe(source('libs.js'))
        .pipe(gulp.dest('./public/build/'));
});


gulp.task('jest', function () {
    return gulp.src('__tests__').pipe(jest({
        scriptPreprocessor: "../preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],        
        testPathIgnorePatterns: [
            "node_modules",
            "spec/support"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});


// Just running the two tasks
gulp.task('default', ['app', 'libs']);