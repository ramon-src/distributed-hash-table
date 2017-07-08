const net = require("net");
const machines = require("./machines.js").machines;

// Create a socket (client) that connects to the server


var versions = [];
var date = new Date();
var dataToChange = {
    key: 'six',
    value: 'Save new value from client put',
    date: '4/' + date.getMonth() + '/' + date.getFullYear()
};

/**
 * Get machines that match with element key
 */
machines.forEach(function (machine) {
    console.log("Máquina encontrada: %s", machine.ip);

    var socket = new net.Socket();

    var buffer = '';

    socket.connect(machine.ip, "localhost", function () {
        console.log("Client: Connected to server");
    });

    socket.on("data", function (data) {
        if (data.indexOf('\n') < 0) {
            buffer += data;
        } else {
            data = data.toString();
            var msg = buffer + data.substring(0, data.indexOf('\n'));
            buffer = data.substring(data.indexOf('\n') + 1);
            var dataFromServer = JSON.parse(msg);

            console.log(dataFromServer);

            if (dataFromServer[0] == dataToChange.key) {
                versions.push([machine.ip, dataFromServer]);
            }
            console.log(versions);
        }
    });

    socket.write(JSON.stringify(['put', dataToChange]) + '\n');

});