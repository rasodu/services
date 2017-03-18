var gulp = require('gulp'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    runSequence = require('run-sequence'),
    exec = require('child_process').exec;

gulp.task('test', function(done) {
    console.log('Statring command: \`make test\`');

    var makeProcess = exec('make test');
    makeProcess.stdout.pipe(process.stdout);
    makeProcess.stderr.pipe(process.stderr);
    makeProcess.on('exit', function(code) {
        console.log('Ending command: \`make test\`');
        done(code);
    });
});

gulp.task('test-watch', function() {
    runSequence('test');
    return watch(['../**', '!../zz-build/**'], batch(function(events, done) {
        runSequence('test', done);
    }));
});
