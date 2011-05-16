/**
 * MUST follow console.* as close as possible
*/
var logjs	= logjs	|| {};
/**
 * Backup old 
*/
logjs._origConsole	= console;

/**
 * Generate and parse a computer friendly stacktrace
 * * works on node, chrome
 * * fails on firefox, but super easy to port
*/
logjs.generateStacktrace	= function(nshift)
{
	// determine nshift
	nshift	= typeof nshift !== 'undefined' ? nshift : 1;
	// generate the current stack
	try{
		i.dont.exist	+= 0;
	}catch(e){
		var stackStr	= e.stack;
	}
	// split the stackStr
	var lines	= stackStr.split('\n');
	//console.log("lines", lines)
	// build the stack itself
	var stacktrace	= [];
	lines.forEach(function(line, index){
		//console.log("line", line)
		// remove all lines which arent location line
		if( line.match(/^ +at/) === null )	return;
		
		//console.log("line", line)
		if( line.match(/^ +at native$/) ){			
			stacktrace.push({
				'function'	: null,
				file		: "native",
				line		: null,
				column		: null			
			});
		}else if( line.match(/\)$/) ){
			// parse location line
			var matches	= line.match(/ +at (([^ ]+) )?\((.+):([^:]+):([^:]+)\)/);
			console.assert(matches && matches.length === 6, "This line isnt of the expected format: "+line)
			// put this location in the stacktrace array
			stacktrace.push({
				'function'	: matches[2],
				file		: matches[3],
				line		: matches[4],
				column		: matches[5]			
			});
		}else{
			var matches	= line.match(/ +at (.+):([^:]+):([^:]+)/);
			console.assert(matches && matches.length === 4, "This line isnt of the expected format: "+line)
			// put this location in the stacktrace array
			stacktrace.push({
				'function'	: null,
				file		: matches[1],
				line		: matches[2],
				column		: matches[3]			
			});
		}
	})
	// remove this function itself from the stacktrace
	for(var i = 0; i < nshift; i++)	stacktrace.shift();
	// return the just built stacktrace array
	return stacktrace;
}

//////////////////////////////////////////////////////////////////////////////////
//		logjs._topFunction*						//
//////////////////////////////////////////////////////////////////////////////////

logjs._topFunctionBegin	= function(stackLevel)
{
	//console.log("topFunctionBegin", stackLevel);	console.trace();
	console.assert(typeof stackLevel !== 'undefined' )
	console.assert(this._topFunctionStack === null);
	this._topFunctionStack	= logjs.generateStacktrace(stackLevel+1);
}

logjs._topFunctionStack	= null;

logjs._topFunctionEnd	= function()
{
	this._topFunctionStack	= null;
	//console.log("topFunctionEnd");
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * to build a log prefix
*/
logjs._logPrefix	= function(stacktrace)
{
	// if no
	if( typeof stacktrace === 'undefined' )	stacktrace	= this._topFunctionStack;
	// build the log prefix
	var item	= stacktrace[0];
	if( item.file === "native" ){
		var prefix	= "[native]:"
	}else{
		var file	= item.file.match('/.*/([^/]+)$')[1]
		var prefix	= file+':'+item.line+":"+item.function+"():";				
	}
	// return the just-built prefix
	return prefix;
}

logjs._log	= function(){
	// build the log prefix
	var prefix	= logjs._logPrefix();
	// build the actual output from prefix and arguments
	var output	= prefix;
	for(var i = 0; i < arguments.length; i++){
		output	+= ' '+ arguments[i];
	}
	// actually do the log
	logjs._origConsole.log(output)
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

logjs.wrapFunction	= function(fct){
	// console.log("wow"); console.dir(fct.__proto__);
	var args	= arguments;
	return function wow(){
		logjs._topFunctionBegin(3);
		logjs._log("enter")
		logjs._topFunctionEnd();
		fct.apply(this, args)
		logjs._topFunctionBegin(3);
		logjs._log("leave")
		logjs._topFunctionEnd();
	}.bind(this);
}


logjs.log	= function(){
	logjs._topFunctionBegin(2);
	//console.dir(this._topFunctionStack);
	logjs._log.apply(logjs, arguments);
	logjs._topFunctionEnd();
}

logjs.assert	= function(condition, reason){
	if( condition )	return;
	logjs._topFunctionBegin(2);
	if( reason )	logjs._log("failed assert!", reason)
	else		logjs._log("failed assert!")
	logjs._topFunctionEnd();
};