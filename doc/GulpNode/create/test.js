/**
 * Created by Administrator on 2016/7/1.
 */
var lib=require('./gulpfile_lib.js'),
    fs=require('fs');
lib.cc('i am cc');
var paths={
    server:'../server',
    history:'../history'
}
fs.readdir(paths.history,function(err,data){
    console.log(data);
    data.sort();
    data.forEach(function(file){
        console.log(file);
        //fs.stat(paths.server+'/js/'+file,function(err,stat){
        //    if(stat.isDirectory()){
        //        console.log(file);
        //    }
        //})
    })
});