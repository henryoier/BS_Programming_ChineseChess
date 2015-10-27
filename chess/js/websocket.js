   getPar = function(){
    	var url = window.document.location.href.toString();
    	var u = url.split("?");
	    if(typeof(u[1]) == "string"){
	        u = u[1].split("&");
	        var get = {};
	        for(var i in u){
	            var j = u[i].split("=");
	            get[j[0]] = j[1];
	        }
	        return get;
	    } else {
	        return {};
	    }
	}

	function send(text){
	    w.send(text);
	}

    var host = '127.0.0.1';
	var para = getPar();
	name = para['name'];
	var port = 8888;
	var url = 'ws://'+host+':'+port+'/';

	w = new WebSocket(url);
    
    w.onopen = function(){
		send('con,' + name);
	}
	    
	function $(id){
	    return document.getElementById(id);
	}

