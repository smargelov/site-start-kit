import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import imgCompress from 'imagemin-jpeg-recompress';

// Images tasks =====================================================
const imgPATH = {
    'input': ['./src/static/images/**/*.{jpg,png,jpeg,svg,webp,gif,ico}',
        '!./src/static/images/svg/*',
    ],
    'proxy': './src/static/images-proxy/',
    'output': './build/images/',
};

const makeWebp = () => {
    return gulp.src(imgPATH.input)
        .pipe(newer(imgPATH.proxy))
        .pipe(webp({
            quality: 75,
        }))
        .pipe(gulp.dest(imgPATH.proxy));
};

const imgOptimization = () => {
    return gulp.src(imgPATH.input)
        .pipe(newer(imgPATH.proxy))
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high',
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo(),
        ]))
        .pipe(gulp.dest(imgPATH.proxy));
};

const imgMove = () => {
    return gulp.src(imgPATH.proxy + '**/*.{jpg,png,jpeg,svg,webp,gif,ico}')
        .pipe(gulp.dest(imgPATH.output));
};

export default gulp.series(
    makeWebp,
    imgOptimization,
    imgMove,
);