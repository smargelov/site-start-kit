import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssO from 'gulp-csso';
import cssComb from 'gulp-csscomb';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import mmq from 'gulp-merge-media-queries';

// Styles =====================================================
const stylesPATH = {
    'input': './src/static/styles/',
    'output': './build/css/',
};
export const stylesDev = () => {
    return gulp.src(stylesPATH.input + 'styles.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(stylesPATH.output))
        .on('end', $.browserSync.reload);
};
export const stylesBuild = () => {
    return gulp.src(stylesPATH.input + 'styles.sass')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
        }))
        .pipe(autoprefixer())
        .pipe(mmq())
        .pipe(cssComb())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(stylesPATH.output));
};
export const stylesBuildMin = () => {
    return gulp.src(stylesPATH.input + 'styles.sass')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(mmq())
        .pipe(cssComb())
        .pipe(cssO())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(stylesPATH.output));
};
export const stylesLib = () => {
    return gulp.src(stylesPATH.input + 'libs.sass')
        .pipe(sass())
        .pipe(cssO())
        .pipe(rename('libs.min.css'))
        .pipe(gulp.dest(stylesPATH.output));
};