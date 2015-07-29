var gulp = require('gulp'),
    plug = require('gulp-load-plugins')();

var paths = {
    src: './src/**/*',
    build: './dist'
};

//=======================================================
//                   Javascript
//=======================================================

gulp.task('build', [], function(){
    var source = [].concat(paths.src);
    return gulp.src(source)
        .pipe(plug.babel())
        .pipe(gulp.dest(paths.build));
});