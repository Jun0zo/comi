const express = require("express");
const fs = require("fs");
const http = require("http");
var cors = require('cors');
var SSHClient = require("ssh2").Client;
var utf8 = require("utf8");
var Docker = require('dockerode');
var docker = new Docker();

const app = express();
var serverPort = 4000;
var server = http.createServer(app);

//set the template engine ejs
app.use(express.json());
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));

function CORS_(res){
    console.log('************ option  ************');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send();
}

var gcontainer
var gstream;
var gsocket;

var all_data = '';
var get_data = '';


var send_mode = true;
app.options('/source', (req, res) => {
    CORS_(res);
});

//  ===================================     routes     ===================================
app.post('/source', (req, res) => {
    let source = (req.body['code'].replace(/\t/gi,''));
    //CORS_(res);
    send_mode = false;
    console.log('================ send_mode : ' , send_mode);
    all_data = '';
    gstream.write('\x03\n');
	gstream.write(`cd ~/ && rm -rf ./* && echo '${source}' >> main.cpp && g++ main.cpp -o main && clear\n`, function(){
	    gstream.write('./main\n', function(){
	        send_mode = true;
        });
    });
    console.log('================ send_mode : ' , send_mode)
});

app.get("/", (req, res) => {
    res.render("index");
});

//  ===================================     //routes     ===================================
server.listen(serverPort);
const io = require("socket.io")(server);
//Socket Connection
io.on("connection", function(socket) {
    console.log('connection com');
    socket.on('exec', function (w, h) {
            console.log('!!!!!');
            var options = {
                Image: 'ubuntu/tet:for-a-compile',
                AttachStdin: false,
                AttachStdout: true,
                AttachStderr: true,
                Tty: true,
                OpenStdin: false,
                StdinOnce: false
            };

            options.Cmd = ['/bin/bash'];
            docker.createContainer(options, function (err, container) {
                console.log("err : ", err)
                console.log("container", container)

                gcontainer = container;
                if (err) { console.log(err);}
                var cmd = {
                    "AttachStdout": true,
                    "AttachStderr": true,
                    "AttachStdin": true,
                    "Tty": true,
                    Cmd: ['/bin/bash']
                };

                

                container.start(function(err, data){
                    console.log(err);
                    container.exec(cmd, (err, exec) => {
                        console.log('exec');
                        var options = {
                            'Tty': true,
                            stream: true,
                            stdin: true,
                            stdout: true,
                            stderr: true,
                            // fix vim
                            hijack: true
                        };

                        if (err) console.log(err);

                        exec.start(options, (err, stream) => {
                            gstream = stream;
                            console.log('start!!');
                            var dimensions = { h, w };
                            if (dimensions.h != 0 && dimensions.w != 0)
                                exec.resize(dimensions, () => { });

                            stream.on('data', (chunk) => {
                                console.log('mode : ', send_mode);
                                console.log('---data--//+', chunk.toString(), '+//--data--');
                                all_data += chunk.toString();
                                if (send_mode === true)
                                    socket.emit('show', chunk.toString());
                            });

                            socket.on('cmd', (data) => {
                                get_data += data;
                                stream.write(data);
                                if(data == '?')
                                    console.log('all : ',all_data,  ' vs ', get_data);
                            });


                        });
                    });
                });
            });

    });
    socket.on('disconnect', function(){
        try {
            gcontainer.remove({force: true}, function (err, data) {
                console.log('remove success!!');
            });
        }
        catch {
            console.log('no');
        }
    })
});

