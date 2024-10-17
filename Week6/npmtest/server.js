const http = require("http"); //Import Nodejs core module

const server = http.createServer(function(req, res) { // creating Server
    // handle incoming requested here
    if (req.url == "/") { //check the URL of the current request
        // set response header
        res.writeHead(200, {'Content-Type': 'text/html'});
        // set response content
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }
    else if (req.url == "/student") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write('<html><body><p>This is student Page.</p></body></html>');
        res.end();
    }
    else if (req.url == "/admin") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    }
    else if (req.url == "/data") {
        res.writeHead(200, {"Content-Type": "application/json"});
        const addNumbers = (num1, num2) => num1 + num2;
        const location = {
            country: "Greece",
            city: "Athens"
        };
        const travel = ({city}) => city;
        res.write(JSON.stringify({ 
            message: "Hello World JSON",
            sum: addNumbers(2, 3),
            travel: travel(location)
        }));
        res.end();
    }
    else res.end('Invalid Request!');
});

server.listen(8000);
console.log("Nodejs web server at port 8000 is running..");