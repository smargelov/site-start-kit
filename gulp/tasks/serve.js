// BrowserSync =====================================================

const serve = () => {
    $.browserSync.init({
        server: './build',
    });
};

export default serve;