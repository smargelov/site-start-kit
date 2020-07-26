import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import cache from 'gulp-cache';
import imgCompress from 'imagemin-jpeg-recompress';
import jsonServer from "gulp-json-srv";
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import pugbem from 'gulp-pugbem';
import cached from 'gulp-cached';


// Clean build folder =====================================================
export const clean = () => {
    return del('./build/**/*')
};

// Fonts move =====================================================
export const fonts = () => {
    return gulp.src('./src/static/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts/'));
};

// Images tasks =====================================================
const imgPATH = {
    "input": ["./src/static/images/**/*.{png,jpg,gif,svg}",
        '!./src/static/images/svg/*'
    ],
    "proxy": "./src/static/proxy-images/",
    "output": "./build/images/"
};

const imgOptimization = () => {
    return gulp.src(imgPATH.input)
        .pipe(cache(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo()
        ])))
        .pipe(gulp.dest(imgPATH.proxy));
};
const makeWebp = () => {
    return gulp.src(imgPATH.proxy + '**/*.{png,jpg}')
        .pipe(cache(webp()))
        .pipe(gulp.dest(imgPATH.proxy + 'webp/'))
}
const imgMove = () => {
    return gulp.src(imgPATH.proxy + '**/*')
        .pipe(gulp.dest(imgPATH.output))
};

export const img = gulp.series(
    imgOptimization,
    makeWebp,
    imgMove
);

// Inc =====================================================
export const inc = () => {
    return gulp.src('./src/static/inc/**/*.*')
        .pipe(gulp.dest('./build/inc/'));
};

// JSON server =====================================================
const jserver = jsonServer.create({
    port: 3002
});

export const jserv = () => {
    return gulp.src('data.json')
        .pipe(jserver.pipe());
};

// BrowserSync =====================================================
browserSync.create();
export const serve = () => {
    browserSync.init({
        server: './build'
    });
};

// Pug task =====================================================
pugbem.b = true;
export const makePug = () => {
        return gulp.src('./src/pug/*.pug')
            .pipe(plumber())
            .pipe(pug({
                pretty: true,
                plugins: [pugbem]
            }))
            .pipe(plumber.stop())
            .pipe(cached('pug'))
            .pipe(gulp.dest('./build/'))
            .on('end', browserSync.reload);
    }
;

// Dev task =====================================================
export const dev = gulp.series(
    clean,
    gulp.parallel(
        img,
        fonts,
        inc,
        makePug
    )
)

// Default task =====================================================
export default gulp.series(
    dev
);