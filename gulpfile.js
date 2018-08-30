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
         /*---Scripts---*/
gulp.task('scripts', function() {
    return gulp.src([
        'source/js/video.js/',
        'source/js/script.js/',
        'source/js/validation.js/'

    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) //Сжимаем JS файл
        .pipe(gulp.dest('source/js')); // Выгружаем в папку app/js
});


              /*----Watch----*/
gulp.task('watch', ['browser-sync', 'sass' ,'scripts'], function() {
    gulp.watch('source/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('source/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
     gulp.watch('source/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});


              /*----Styles compile----*/

gulp.task('sass', function(){

    return gulp.src('source/scss/main.scss') // Получаем все файлы с окончанием .scss в папке app/scss и дочерних директориях)

        .pipe(sass()) // Конвертируем Sass в CSS с помощью gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
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
        })))
        .pipe(gulp.dest('build/images'))

});

          /*----Clean build----*/

gulp.task('clean', function() {
    return del.sync('build'); // Удаляем папку dist перед сборкой
});


           /*---Build---*/
gulp.task('build', ['clean','img','sass', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'source/css/main.min.css',

    ])
        .pipe(gulp.dest('build/css'));

    var buildFonts = gulp.src('source/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('build/fonts'));

    var buildJs = gulp.src('source/js/libs.min.js') // Переносим скрипты в продакшен
        .pipe(gulp.dest('build/js'));

    var buildVideo = gulp.src('source/video/**/*') // Переносим видео в продакшен
        .pipe(gulp.dest('build/video'));

    var buildHtml = gulp.src('source/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('build'));

});





gulp.task('clear', function () {
    return cache.clearAll();
})


gulp.task('default', ['watch']);