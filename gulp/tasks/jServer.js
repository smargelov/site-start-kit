import jsonServer from 'gulp-json-srv';

// JSON server =====================================================
const server = jsonServer.create({
    port: 3002,
});

const jServ = () => {
    return $.gulp.src('./data/data.json')
        .pipe(server.pipe());
};

export default jServ;
