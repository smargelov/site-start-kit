import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import svgMin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';

// SVG Sprite =====================================================
const svgPath = {
    'input': './src/static/images/svg/*.svg',
    'output': './build/images/svg/',
};

const makeSvgSprite = () => {
    return gulp.src(svgPath.input)
        .pipe(svgMin({
            js2svg: {
                pretty: true,
            },
        }))
        .pipe(cheerio({
            run: function ($) {
                //$('[fill]').removeAttr('fill');
                //$('[stroke]').removeAttr('stroke');
                //$('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true,
            },
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: 'sprite.svg',
                },
            },
        }))
        .pipe(gulp.dest(svgPath.output));
};

export default makeSvgSprite;