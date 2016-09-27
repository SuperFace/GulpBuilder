/**
 * Created by Administrator on 2016/7/1.
 */
//两位数格式化
exports.formateNm=function (num){
    return num<10?"0"+num:''+num;
};
////
exports.cc=function(p){
    console.log(p);
}
exports.compileLess=function(stream,output){
    return stream.pipe(plumber({errorHandler:notify.onError('error:<%= error.message %>')}))
        .pipe(less())
        .pipe(rename({suffix:'.less'}))
        .pipe(gulp.dest(output))
        //提醒任务完成
        .pipe(notify({ message: 'some less changed' }));
}