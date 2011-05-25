// consoleWorker, the page side
this.consoleWorker	=  {}
consoleWorker.filterEvent	= function(event){
	// sanity check - check the event
	console.assert(event);
	if( 'data' in event === false )		return false;
	if( typeof event.data !== 'object' )	return false;
	if( 'type' in event.data === false )	return false;
	// get data from the event	
	var type	= event.data.type;
	var data	= event.data.data;
	if( type !== '_consoleWorker' )	return false;
	console[data.type].apply(console, data.data);
	return true;
}
consoleWorker.bind	= function(worker){
	worker.addEventListener('message', function(event){
		//console.log("consoleWorker.bind():", event.data, event)
		if( consoleWorker.filterEvent(event) ){
			// failed attempts to get message parsing less intrusive
			//console.log("stopped event2")
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
		return undefined;
	}.bind(this), false);
}
