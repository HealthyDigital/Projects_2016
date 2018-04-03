var gulp = require('gulp'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    reload = browserSync.reload;

gulp.task('compass', function(){
    gulp.src('src/sass/*.scss')
    .pipe(compass({
        css : './dist/css',
        sass : './src/sass',
        image : './dist/images',
        style : 'compact'
    }))
    .on('error', function(err){
        console.log(err);
        this.emit('end');
    })
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
})

gulp.task('serve', function(){
    browserSync.init({
        server : {
            baseDir : "./",
            middleware: [ historyApiFallback() ]
        },
        cors: true
        
        /*middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        next();
      }*/
    })
    
    gulp.watch('src/sass/*.scss', ['compass']);
    gulp.watch('./*.html').on('change', reload);
    gulp.watch('./includes/*.php').on('change', reload);
    gulp.watch('./dist/js/*.js').on('change', reload);
})

gulp.task('default', ['serve']);