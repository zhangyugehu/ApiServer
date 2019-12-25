// 导入http模块:
var http = require('http');
var fs = require('fs');

var _notificationList
// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    if (request.url === '/notification') {
        // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
        response.writeHead(200, {'Content-Type': 'application/json'});
        // 将HTTP响应的HTML内容写入response:
        response.end('{"key1": "Vvvv"}');
    } else {
        response.end('invidate: ' + request.url);
    }
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
