var net = require('net');

var chatServer =  net.createServer(),
	cleanup = [],
	clientList = [];

function broadcast(message, client){
		for (var i = 0;  i < clientList.length; i+=1) {
			if (client!=clientList[i]) {
				if(clientList[i].writable){
					clientList[i].write(client.name + 'says '+ message);	
				}
				else
				{
					cleanup.push(clientList[i]);
					clientList[i].destroy();
				}				
			};
		};		
};


chatServer.on('connection', function(client){
	client.name = client.remoteAddress + ':' + client.remotePort;	
	client.write('Hi'+ client.name +'\n');
	console.log(client.name + ' joined');
	clientList.push(client); 

	client.on('data', function(data){	
		broadcast(data, client);
	});

	//Remove dead Nodes out of write loop to avoid trashing loop index
	client.on('end', function(){
		console.log(client.name + ' quit');
		for(i=0; i<cleanup.length; i+=1){
			clientList.splice(clientList.indexOf(client),1);		
		}
	});

	client.on('error', function(e){
		console.log(e);
	});
});

chatServer.listen(9000);

console.log("Chat sever initiated");