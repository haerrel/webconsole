class Client {

    constructor(url, onConnect, onReceive, onException) {
        const socket = io(url);
        socket.on('connect', function () {
            onConnect();
        });
        socket.on('output', function (data) {
            onReceive(data);
            //process.stdout.write(data);
        });
        socket.on('disconnect', function () { });
        socket.on('server_side_close', function (exitcode) {
            alert(`Executable stopped with exitcode ${exitcode}. Reload the page to start a new session.`)
        })
        this.socket = socket;    
    }

    send(msg) {
        this.socket.emit("input", msg)
    }
}
