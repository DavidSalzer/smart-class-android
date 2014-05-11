function Server_link() {
	//Singleton class; https://code.google.com/p/jslibs/wiki/JavascriptTips#Singleton_pattern

	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;
	
	self=this;
	self.counter=1;
	self.reqArray=new Array();
	
	self.add_request=function(type, req,callback){
		reqID=self.counter++;
		self.reqArray[reqID]={
			type:type,
			req:req,
			callback:callback,
			reqID:reqID
		};
		return reqID;
	}
	
	self.send_Instantly_req=function(type, req,callback){
		data={
			type:type,
			req:req,
			callback:callback,
			reqID:0
		};
		sendData([data]);
		return 0;
	}
	
	self.sendAllRequest=function(){
		var reqArray=self.reqArray;
		self.reqArray=new Array();
		sendData(reqArray);
	}
	
	//private
	var sendData=function(reqArray){
		$.ajax({
			type: "POST",
			method: "POST",
			url: "json.api.php",
			data: {reqArray:JSON.stringify(reqArray.filter(function(e){return e}))},
			dataType: 'json'})
			.done(function(res){
				res.resArray.forEach(function(entryRes) {
					var entryReq=reqArray[entryRes.reqID];
					if (typeof (entryReq.callback) == 'function')
						entryReq.callback(entryRes.res,entryReq.type,entryReq.req)
					else{
						console.log({type:entryReq.type});
						console.log({req:entryReq.req});
						console.log(entryRes.res);
					}
				});
						
			})
			.fail(function(jqxhr, textStatus, error ){
				var err = textStatus + ", " + error;
				//console.log({type:type,req:req,err:"Request Failed: " + err});
			});
	}

}