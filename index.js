const http = require('http');

let server = http.createServer((req,res)=>{
    res.write("hello world");
    res.end();
});

server.listen(3000);
