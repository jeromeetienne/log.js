var logjs	= logjs	|| require('../lib/logjs.js');
//console	= logjs;

function slota2(){
	//logjs.dir(stacktraceGenerate());
	//logjs.log("enter", 1+2, slota2);
	//logjs.log("bonjour")
	logjs.assert(false, "no good")
	//logjs.assert(false);
}
//slota2	= logjs.wrapFunction(slota2);
function slota3(){	slota2();	}
slota3();

//function slota4(){
//	logjs.log("prout")
//	logjs.assert(false, "false is no good")
//}
//slota4	= logjs.wrapFunction(slota4);
//logjs.log("slota4", slota4)
//slota4();
