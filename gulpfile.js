'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';

import makePug from './gulp/tasks/pug.js';
import serve from './gulp/tasks/serve.js';
import fonts from './gulp/tasks/fonts.js';
import img from './gulp/tasks/images.js';
import inc from './gulp/tasks/inc.js';
import jServ from './gulp/tasks/jServer.js';
import makeSvgSprite from './gulp/tasks/svg.js';
import * as clean from './gulp/tasks/clean.js';
import * as style from './gulp/tasks/styles.js';
import * as js from './gulp/tasks/js.js';

global.$ = {
    browserSync: browserSync.create(),
};

// Watch =====================================================
export const watch = () => {
    gulp.watch('./src/pug/**/*.pug', gulp.series(makePug));
    gulp.watch('./src/static/styles/**/*.sass', gulp.series(style.stylesDev));
    gulp.watch('./src/static/styles/libs.sass', gulp.series(style.stylesLib));
    gulp.watch(['./src/static/images/general/**/*.{png,jpg,gif,svg}',
        './src/static/images/content/**/*.{png,jpg,gif,svg}'], gulp.series(img));
    gulp.watch('./src/static/images/svg/*.svg', gulp.series(makeSvgSprite));
    gulp.watch('./src/static/js/**/*.js', gulp.series(js.jsDev));
};

// Dev task =====================================================
export const dev = gulp.series(
    clean.cleanBuild,
    gulp.parallel(
        img,
        fonts,
        makeSvgSprite,
        inc,
        makePug,
        style.stylesDev,
        style.stylesLib,
        js.libsJsDev,
        js.jsDev,
    ),
);

// Build task =====================================================
export const build = gulp.series(
    clean.cleanProxy,
    clean.cleanBuild,
    gulp.parallel(
        img,
        fonts,
        makeSvgSprite,
        inc,
        makePug,
        style.stylesBuild,
        style.stylesLib,
        js.libsJsBuild,
        js.jsBuild,
    ),
);

// Build min task =====================================================
export const buildMin = gulp.series(
    clean.cleanProxy,
    clean.cleanBuild,
    gulp.parallel(
        img,
        fonts,
        makeSvgSprite,
        inc,
        makePug,
        style.stylesBuildMin,
        style.stylesLib,
        js.libsJsBuild,
        js.jsBuildMin,
    ),
);

// Default task =====================================================
export default gulp.series(
    dev,
    gulp.parallel(
        watch,
        serve,
    ),
);