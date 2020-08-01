import gulp from 'gulp';
import cached from 'gulp-cached';
import plumber from 'gulp-plumber';

import pug from 'gulp-pug';
import pugBem from 'gulp-pugbem';
import fs from 'fs';

// Pug task =====================================================
pugBem.b = true;
const makePug = () => {
    return gulp.src('./src/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            locals: {
                nav: JSON.parse(fs.readFileSync('./data/navigation.json', 'utf8')),
                content: JSON.parse(fs.readFileSync('./data/content.json', 'utf8')),
            },
            pretty: true,
            plugins: [pugBem],
        }))
        .pipe(plumber.stop())
        .pipe(cached('pug'))
        .pipe(gulp.dest('./build/'))
        .on('end', $.browserSync.reload);
};

export default makePug;