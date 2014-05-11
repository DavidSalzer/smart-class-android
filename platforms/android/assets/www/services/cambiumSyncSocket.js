smartClassApp.factory('cambiumSyncSocket', ['$stateParams', '$q', 'classAjax', function ($stateParams, $q, classAjax) {
	
	//var IPaddress=
	var socket = io.connect('http://54.205.138.41:3000');
      
    return {
	
		getSocket:function(){
		
			return socket;
		},
		
		setSincSocket:function(){
			
			
			var deferred = $q.defer();
			
			var sinc = classAjax.getdata({type:"cambiumSync-getKey", req:{}}); 
	
			sinc.then(function(data){
				
				console.log(data);
				key=data.res.key;
		
			socket.on('error', function (data) {
			//if (data.code==1)
				//sendKey();
			});
			
			//alert("aaaaa - "+key);
			
			socket.emit('sendKey', { key: key });
			});
			console.log(deferred.promise);
			
			//deferred.resolve(data)
			return deferred.promise; 
            
			
        }
    }
} ])
