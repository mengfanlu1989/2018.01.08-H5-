/*
	声明任务
*/
var gulp = require("gulp");

/*
	拷贝html里的文件
	第一个参数：任务的名字
	第二个参数：这个任务所要执行的具体的步骤（函数）
*/
gulp.task("copy-html", function(){
	/*
		html/*.html  找到html文件夹下，所有后缀为.html的文件
		gulp.src()  查找源文件路径
		pipe()      管道，任务要执行的时候要通过管道来执行
		gulp.dest() 存放的目录路径（可以有没有文件目录，如果该目录没有的话，会自己创建）

	*/
	return gulp.src("html/*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})



//var imagemin = require("gulp-imagemin");
/*
	图片的拷贝
*/
gulp.task("images", function(){
	return gulp.src("images/*.{jpg,png}")
	//.pipe(imagemin())
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})


/*
	编译scss文件
	gulp-scss插件
*/
// 引入这个插件
var scss = require("gulp-sass-china");
gulp.task("scss", function(){
	return gulp.src("scss/*.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

/*
	拷贝js文件
*/
gulp.task("scripts", function(){
	return gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

/*
	拷贝数据
*/
gulp.task("data", function(){
	return gulp.src("data/*.json")
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})


/*
	有没有一种方式可以将上述任务一起执行
	第二参数：数组，写着我们要去执行的任务
*/
gulp.task("build", ["copy-html", "images", "scss", "scripts", "data"], function(){
	console.log("编译成功!");
})

/*
	gulp监听文件
*/
gulp.task("watch", function(){
	/*
		两个参数
		第一个参数是，我们要检测的文件的路径
		第二个参数是，我们监听到变化以后要去执行的任务。必须是数组。
	*/
	gulp.watch("html/*.html", ["copy-html"]);
	gulp.watch("images/*.{jpg,png}", ["images"]);
	gulp.watch("scss/*.scss", ["scss"]);
	gulp.watch("js/*.js", ["scripts"]);
	gulp.watch("data/*.json", ["data"]);
})

/*
	gulp-connect
*/
var connect = require("gulp-connect");
gulp.task("server", function(){
	/*
		我们启动临时服务器
		自动刷新功能
	*/
	connect.server({
		root: "dist", //以哪个文件夹为服务器的根目录
		port: 8888,   //设置服务器的端口号
		livereload: true //设置当前可以自动刷新
	})
})


/*
	启动服务器的时候，同时启动监听
	【注】如果我们设置defult任务，在终端执行任务的时候
	直接写gulp
*/
gulp.task("default", ["watch", "server"]);
