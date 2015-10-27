var conns = new Array();
 
var ws = require('websocket-server');
var server = ws.createServer();
var map = [];

var mysql = require('mysql');  
      
var TEST_DATABASE = 'chat';    
  
//创建连接  
var client = mysql.createConnection({  
  user: 'root',  
  password: '',  
});  

client.connect();
client.query('USE '+ TEST_DATABASE);

server.addListener('connection', function(conn){
     
    conns.push(conn);
    
    conn.addListener('message',function(msg){
     
        console.log(msg);
        msgs = msg.split(',');

        if(msgs[0] == 'con'){
            for(var i=0; i<conns.length; i++){
                if(conn == conns[i])
                    conns[i].send(msgs[0] + ',' +i);
            }
        }else
        if(msgs[0] == 'login'){
            client.query("INSERT INTO user VALUES('" + msgs[1] +"','"+msgs[2]+"','"+msgs[3]+"')");
        }else 
        if(msgs[0] == 'query'){
            client.query(  "SELECT * FROM rank",  
                function selectCb(err, results, fields) {  
                if (err) {  
                    throw err;  
                }  
                
                if(results)
                  {   
                      for(var i = 0; i < results.length; i++)
                      {   
                          conn.send(results[i].name + ',' + results[i].win);
                      }
                  }     
                }  
            );
        }
        else{
            for(var i=0; i<conns.length; i++){
                if(conn != conns[i])
                    conns[i].send(msg);
            }
        }
    });
});
 
server.listen(8888);
console.log('running......');