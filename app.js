const http = require("http");
const server = http.createServer();
const url = require("url");
const querystring = require("querystring");

server.on('request', function(req, res) {
    let urlOption = url.parse(req.url);
    let remote = urlOption.pathname;
	remote=remote.slice(1);
	if(!/^http/.test(remote)){
		remote="http://"+remote;
	}
	let parseRemote=url.parse(remote);
	parseRemote.headers={
		a:'b'
	}
	let request=http.request(parseRemote)
	request.on('response', function(response) {
		var c = "";
		response.setEncoding('utf8');
		response.on('data', function(chunk) {
			c += chunk;
		});
		response.on('end', function() {
			let headers=Object.assign(response.headers,{"Access-Control-Allow-Origin":"*"});
			res.writeHead(200, headers);			
			res.end(c);
		});
	});
	request.on('error', function(err) {
		res.writeHead(200, {
			"Content-Type": "application/json"
		});
		res.end({ "err": err });
	});
	request.end();
});
server.listen(9999, function() {
    console.log("server on port 9999");
});