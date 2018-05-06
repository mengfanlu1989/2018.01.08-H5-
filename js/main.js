console.log("载入chenggong！");

/*
	写js代码，必须使用require.js的AMD规范编写代码
*/

//设置引入文件的路径
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie.js",
		"index": "index",
		"parabola": "parabola"
		
	},

	/*
			在require中，引入一些插件
	*/
	shim: {
		"jquery-cookie": ["jquery"],
		/*
			引用不遵从AMD规范的js文件
		*/
		"parabola": {
			exports: "_"
		}
	}
})


//引入对应的模块
require(["index"], function(index){
	console.log(index.main());
})


















