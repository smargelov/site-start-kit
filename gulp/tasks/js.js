import gulp from 'gulp';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import babel from 'gulp-babel';

// Scripts =====================================================
const scriptsPATH = {
    'input': './src/static/js/',
    'output': './build/js/',
};
export const libsJsDev = () => {
    return gulp.src([
        'node_modules/svg4everybody/dist/svg4everybody.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest(scriptsPATH.output));
};

export const libsJsBuild = () => {
    return gulp.src([
        'node_modules/svg4everybody/dist/svg4everybody.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(scriptsPATH.output));
};

export const jsDev = () => {
    return gulp.src([scriptsPATH.input + '*.js',
        '!' + scriptsPATH.input + 'libs.min.js',
    ])
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(gulp.dest(scriptsPATH.output))
        .pipe($.browserSync.reload({
            stream: true,
        }));
};

export const jsBuild = () => {
    return gulp.src([scriptsPATH.input + '*.js',
        '!' + scriptsPATH.input + 'libs.min.js',
    ])
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(gulp.dest(scriptsPATH.output));
};

export const jsBuildMin = () => {
    return gulp.src([scriptsPATH.input + '*.js',
        '!' + scriptsPATH.input + 'libs.min.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(scriptsPATH.output));
};
