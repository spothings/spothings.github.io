// webpack.mix.js

let mix = require('laravel-mix');

mix.js('src/js/app.js', 'public/js')
     .sass('src/sass/min.scss', 'scss')
     .setPublicPath('public');