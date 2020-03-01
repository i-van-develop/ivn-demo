const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.options({
    hmrOptions: {
        host: 'laravel.dev.local',  // site's host name
        port: 8080,
    }
});


mix.webpackConfig({
    // add any webpack dev server config here
    devServer: {
        proxy: {
            host: '0.0.0.0',  // host machine ip
            port: 8080,
        },
        watchOptions:{
            aggregateTimeout:200,
            poll:5000
        },

    },
    resolve: {
        alias: {
            sass: path.resolve(__dirname, 'resources/sass/'),
            '~': path.resolve(__dirname, 'resources/js/'),
        }
    }
});

mix.copyDirectory('resources/images', 'public/images');
mix.copyDirectory('resources/fonts', 'public/fonts');
