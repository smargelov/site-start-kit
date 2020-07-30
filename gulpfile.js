import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import imgCompress from 'imagemin-jpeg-recompress';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';
import jsonServer from "gulp-json-srv";
import pug from 'gulp-pug';
import pugbem from 'gulp-pugbem';
import cached from 'gulp-cached';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import csscomb from 'gulp-csscomb';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import mmq from 'gulp-merge-media-queries';


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
    "input": ["./src/static/images/**/*.{jpg,png,jpeg,svg,webp,gif,ico}",
        '!./src/static/images/svg/*'
    ],
    "proxy": "./src/static/images-proxy/",
    "output": "./build/images/"
};

const makeWebp = () => {
    return gulp.src(imgPATH.input)
        .pipe(newer(imgPATH.proxy))
        .pipe(webp({
            quality: 75
        }))
        .pipe(gulp.dest(imgPATH.proxy));
}

const imgOptimization = () => {
    return gulp.src(imgPATH.input)
        .pipe(newer(imgPATH.proxy))
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo(),
        ]))
        .pipe(gulp.dest(imgPATH.proxy));
};

const imgMove = () => {
    return gulp.src(imgPATH.proxy + '**/*.{jpg,png,jpeg,svg,webp,gif,ico}')
        .pipe(gulp.dest(imgPATH.output))
}

export const img = gulp.series(
    makeWebp,
    imgOptimization,
    imgMove
);

// SVG Sprite =====================================================
const svgPath = {
    "input": "./src/static/images/svg/*.svg",
    "output": "./build/images/svg/"
};

export const svgSpriter = () => {
    return gulp.src(svgPath.input)
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                // $('[fill]').removeAttr('fill');
                // $('[stroke]').removeAttr('stroke');
                // $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(svgPath.output));
};

// Styles =====================================================
const stylesPATH = {
    "input": "./src/static/styles/",
    "output": "./build/css/"
};
export const stylesDev = () => {
    return gulp.src(stylesPATH.input + 'styles.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(stylesPATH.output))
        .on('end', browserSync.reload);
};
export const stylesBuild = () => {
    return gulp.src(stylesPATH.input + 'styles.sass')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions']
        }))
        .pipe(autoprefixer())
        .pipe(mmq())
        .pipe(csscomb())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(stylesPATH.output))
};
export const stylesBuildMin = () => {
    return gulp.src(stylesPATH.input + 'styles.sass')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(mmq())
        .pipe(csscomb())
        .pipe(csso())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(stylesPATH.output))
};
export const stylesLib = () => {
    return gulp.src(stylesPATH.input + 'libs.sass')
        .pipe(sass())
        .pipe(csso())
        .pipe(rename('libs.min.css'))
        .pipe(gulp.dest(stylesPATH.output))
};

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