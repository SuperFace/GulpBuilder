//导入工具包 require
var gulp = require('gulp'),
    del = require('del'),
    events = require('events'),
    emitter = new events.EventEmitter(),
    moment = require('moment'),
    fs=require('fs'),
    lib = require('./create/gulpfile_lib'),
    formateNm=lib.formateNm,
    argv = require('minimist')(process.argv.slice(2)),
    minifycss = require('gulp-minify-css'),
    autoprefixer=require('gulp-autoprefixer'),
    livereload=require('gulp-livereload'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    dest = require('gulp-dest'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    useref=require('gulp-useref'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    minifyhtml = require('gulp-minify-html'),
    gulpignore=require('gulp-ignore'),
    filter = require('gulp-filter'),
    assetManifest=require('gulp-asset-manifest'),
    flatten=require('gulp-flatten'),
    clean=require('gulp-clean'),
    runSequence = require('gulp-sequence'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    gulp_remove_logging=require("gulp-remove-logging");

/////////////////////////////////////////////构建demo
var paths={};
paths.src='./src';
paths.server='./server';
paths.history='./history';
paths.input={
    js:paths.src+'/js',
    css:paths.src+'/css',
    images:paths.src+'/images',
    less:paths.src+'/less',
    coffee:paths.src+'/coffee',
    pages:paths.src
};
paths.output={
    js:paths.server+'/js',
    css:paths.server+'/css',
    images:paths.server+'/images',
    pages:paths.server
};

//task-help
gulp.task('help',function(){
    console.log('--------------注释---------------------------');
    console.log('gulp compile:css    构建css');
    console.log('gulp compile:js     构建js');
    console.log('gulp compile:images 构建images');
    console.log('gulp compile:rev    构建pages——包含html、php');
    console.log('gulp backup         备份最新版本');
    console.log('gulp build          一键构建，包含css、js、images、rev、和backup');
    console.log('gulp back           回退到上最近的一个版本');
    console.log('gulp back --v xxxx  回退到某一特定版本xxxx代表版本号');
    console.log('gulp less           less编译：src/less/=>src/css，后缀由 -.less变为 -.less.css');
    console.log('gulp watch:less     less实时编译');
    console.log('--------------注释---------------------------');
});
////////////////////////////////////////////////////////////
gulp.task('compile:css',function(){
    gulp.src(paths.input.css+'/*.css')
        //.pipe(less())
        //.pipe(ignore.exclude(paths.input.css+'/style.css'))
        //添加前缀
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //压缩、md5加密并输出到目录
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest(paths.output.css))
        //生成rev-manifest.json并输出到目录
        .pipe(rev.manifest())
        .pipe(gulp.dest(paths.input.css))
        //提醒任务完成
        .pipe(notify({ message: 'css_compile task complete' }));
});
gulp.task('compile:js',function(){
    gulp.src(paths.input.js+'/*.js')
        .pipe(jshint.reporter('default'))
        .pipe(gulp_remove_logging())
        //压缩、md5加密并输出到目录
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(paths.output.js))
        //生成rev-manifest.json并输出到目录
        .pipe(rev.manifest())
        .pipe(gulp.dest(paths.input.js))
        //提醒任务完成
        .pipe(notify({ message: 'js_compile task complete' }));
});
gulp.task('compile:images',function(){
    gulp.src(paths.input.images+'/*.{png,jpg,gif,ico}')
        .pipe(gulp.dest(paths.output.images))
        .pipe(imagemin({//强制压缩
            optimizationLevel: 1,
            progressive: true,
            interlaced: true ,
            multipass: true
        }))
        .pipe(gulp.dest(paths.output.images))
        //提醒任务完成
        .pipe(notify({ message: 'images_compile task complete' }));
});
gulp.task('compile:rev',function(){
    //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    gulp.src([paths.src+'/*/rev-manifest.json', paths.input.pages+'/*.html', paths.input.pages+'/*.php'])
        //- 执行文件内css名的替换
        .pipe(revCollector())
        //压缩并输出到目录
        .pipe(minifyhtml())
        .pipe(gulp.dest(paths.output.pages))
        //提醒任务完成
        .pipe(notify({ message: 'html_compile task complete' }));
    gulp.src(paths.src+'/***/*.html')
        //压缩并输出到目录
        .pipe(minifyhtml())
        .pipe(gulp.dest(paths.server))
        //提醒任务完成
        .pipe(notify({ message: 'html_compile task complete' }));
});
gulp.task('less',function(){
    gulp.src(paths.input.less+'/*.less').doLess(paths.input.css);
});
gulp.task('backup',function(){
    var dt=new Date();
    c=''+dt.getFullYear()+formateNm(dt.getMonth()+1)+formateNm(dt.getDate())+formateNm(dt.getHours())+formateNm(dt.getMinutes())+formateNm(dt.getSeconds());
    console.log('backup version:'+c);
    gulp.src([paths.server+'/***/*.*'])
        .pipe(gulp.dest(paths.history+'/'+c))
        .pipe(notify({message:'backup task complete'}));
    gulp.src([paths.server+'/*.*'])
        .pipe(gulp.dest(paths.history+'/'+c))
        .pipe(notify({message:'backup task complete'}));
});
var gotoVersion="";
gulp.task('back',function(cb){
    fs.readdir(paths.history,function(err,data){
        if(data&&data.length!==0){
            var dt=data.sort();
            gotoVersion=argv.v||dt[dt.length-1];
            return runSequence('clean:dev','resetVersion',cb);
        }else{
            console.log("there\'s no backup in directory "+paths.history);
            return;
        }
    });
});
gulp.task('resetVersion',function(){
    console.log('back version:'+gotoVersion);
    gulp.src([paths.history+'/'+gotoVersion+'/***/*.*'])
        .pipe(gulp.dest(paths.server))
        .pipe(notify({message:'back task complete'}));
    gulp.src([paths.history+'/'+gotoVersion+'/*.*'])
        .pipe(gulp.dest(paths.server))
        .pipe(notify({message:'back task complete'}));
});
gulp.task('clean:dev',function(){
    return gulp.src(paths.server)
        .pipe(clean())
        .pipe(notify({message:'clean:dev task complete'}));
});
gulp.task('build',function(cb){
    runSequence('backup','less',['compile:css','compile:js','compile:images'],'compile:rev',cb);
});
/////////////////////////////////////////////////////////////////////////////////watch
//监听-浏览器自动刷新
gulp.task('lp', function() {
    livereload.listen();
    gulp.watch([paths.src+'/*/*.*',paths.src+'/*.*'],function(file){
        livereload.changed(file.path);
    });
});
//监听-less自动编译
gulp.task('watch:less',function(){
    watch(paths.input.less+'/*.less')
        .pipe(plumber({errorHandler:notify.onError('error:<%= error.message %>')}))
        .pipe(less())
        .pipe(rename({suffix:'.less'}))
        .pipe(gulp.dest(paths.input.css))
        //提醒任务完成
        .pipe(notify({ message: 'some less changed' }));
});
gulp.task('watch:all',['lp','watch:less']);
//监听-+es6自动编译
//gulp.task('watch:less',function(){
//    watch(paths.input.es6+'/*.less')
//        .pipe(plumber({errorHandler:notify.onError('error:<%= error.message %>')}))
//        .pipe(less())
//        .pipe(rename({suffix:'.less'}))
//        .pipe(gulp.dest(paths.input.css))
//        //提醒任务完成
//        .pipe(notify({ message: 'some less changed' }));
//});
gulp.task('watch',['watch:less','watch:es6']);
/////////////////////////////////////////////////////////////////////////////////watch
/////////////////////////////////////////////////////////////////////////////////watch-2
//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('live', function () {
    gulp.watch(['./src/**/*.*'], ['reload-res']);
});
gulp.task('reload-res', function () {
    gulp.src('./src/**/*.*')
        .pipe(connect.reload())
        .pipe(notify({message:'file reload'}));
});
//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true,
        port:80
    });
});
//测试服务器
gulp.task('default',['connect','live']);
/////////////////////////////////////////////////////////////////////////////////watch-2
/////////////////////////////////
gulp.task('test', function() {
    gulp.src(paths.src+'/dom/car.html')
        .pipe(rev())
        .pipe(gulp.dest(paths.output.pages))
});
/////////////////////////////////////////////////////////////////////////////////extends
//拓展stream流的less函数
!function(){
    gulp.src('').__proto__.doLess=function(out){
        this.pipe(plumber({errorHandler:notify.onError('error:<%= error.message %>')}))
            .pipe(less())
            .pipe(rename({suffix:'.less'}))
            .pipe(gulp.dest(out))
            //提醒任务完成
            .pipe(notify({ message: 'some less changed' }));
    };
}();
