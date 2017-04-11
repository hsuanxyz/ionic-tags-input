/**
 * Created by hsuanlee on 2017/4/11.
 */
var gulp = require('gulp');

var componentsDevPath = '_tags-input/src/components/ion-_tags-input';

gulp.task('copy2src',function () {
    return gulp.src(
        [componentsDevPath+'/**/*']
    ).pipe(gulp.dest('src'))
});