import gulp from 'gulp';

// Inc =====================================================
const inc = () => {
    return gulp.src('./src/static/inc/**/*.*')
        .pipe(gulp.dest('./build/inc/'));
};

export default inc;