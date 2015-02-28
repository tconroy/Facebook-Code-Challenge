requirejs.config({
    baseUrl: './lib',
    paths: {
        build: '../build'
    }
});

require('build/Main');