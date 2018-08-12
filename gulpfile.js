var gulp      = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    cache       = require('gulp-cache'),
    del         = require('del');


           /*-----Server-----*/
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'source' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

              /*----Watch----*/
gulp.task('watch', ['browser-sync', 'sass' /*'scripts'*/], function() {
    gulp.watch('source/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('source/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    //  gulp.watch('app/js/**/*.js', browserSync.reload);  Наблюдение за JS файлами в папке js
});


              /*----Styles compile----*/

gulp.task('sass', function(){

    return gulp.src('source/scss/main.scss') // Получаем все файлы с окончанием .scss в папке app/scss и дочерних директориях)

        .pipe(sass()) // Конвертируем Sass в CSS с помощью gulp-sass

        .pipe(gulp.dest('source/css'))

        .pipe(browserSync.reload({stream: true}))

});
             /*----Images compile----*/

gulp.task('img', function() {
    return gulp.src('source/images/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })));
});

          /*----Clean build----*/

gulp.task('clean', function() {
    return del.sync('build'); // Удаляем папку dist перед сборкой
});

gulp.task('clear', function () {
    return cache.clearAll();
})


gulp.task('default', ['watch']);