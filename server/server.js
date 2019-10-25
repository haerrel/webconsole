const settings = require("./settings");
const {get_utilization_visualizer, on_verbose} = require("./utils");
const { spawn } = require('child_process');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var connection_pool = [];
var get_utilization = get_utilization_visualizer(connection_pool, settings.max_connections)

function is_pool_full() {
    return connection_pool.length >= settings.max_connections;
}
function create_process() {
    const process = spawn(settings.executable.path, settings.executable.args);
    return process;
}

function on_connect(socket) {
    if (!is_pool_full()) {
        const process = create_process();

        process.stdout.on('data', (data) => {
            socket.emit("output", data.toString());
        });
        process.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        process.on('close', (code) => {
            socket.emit("server_side_close", code);
            console.log(`child process exited with code ${code}`);
        });

        socket.app = process;
    }
    on_verbose(() => {
        console.log('a user connected');
        console.log(get_utilization());
    });
}

io.on('connection', function(socket){
    connection_pool.push(socket);
    on_connect(socket);

    socket.on('input', function(data) {
        socket.app.stdin.write(data);
        //socket.app.stdin.end(); // might be necessary.. so far its not necessary
    })

    socket.on('disconnect', function(){
        connection_pool.splice(connection_pool.indexOf(socket), 1);
        socket.app.kill();
        on_verbose(() => {
            console.log('user disconnected');
            console.log(get_utilization());
        });
    });
});

http.listen(settings.port, function(){
    console.log('listening on *:' + settings.port);
    on_verbose(() => {
        console.log(get_utilization())
    });
});