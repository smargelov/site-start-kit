import gulp from 'gulp';

// Fonts move =====================================================
const fonts = () => {
    return gulp.src('./src/static/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts/'));
};

export default fonts;