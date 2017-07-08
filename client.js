const net = require("net");
const machines = require("./machines.js").machines;

// Create a socket (client) that connects to the server


var versions = [];
var date = new Date();
var dataToChange = {
    key: 'one',
    value: 'creating',
    date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
};

/**
 * Get machines that match with element key
 */

var callback = function (versions) {
    versions.forEach(function (machine){
        console.log(machine);
        var socket = new net.Socket();

        var buffer = '';

        socket.connect(machine[0], "localhost", function () {
            console.log("Client by machine: Connected to server");
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

                if(dataFromServer[0] == dataToChange.key){
                    versions.push([machine[1].ip, dataFromServer]);
                }
            }
        });

        socket.write(JSON.stringify(['put', dataToChange]) + '\n');
    });
}

var collect_start = function (machines, callback) {
    collect(0, machines, versions, callback);
}

var collect = function (i, machines, versions, callback) {

    if (i >= (machines.length - 1)) {
        callback(versions);
        return;
    }

    console.log("Máquina encontrada: %s", machines[i].ip);

    var socket = new net.Socket();

    var buffer = '';

    socket.connect(machines[i].ip, "localhost", function () {
        console.log("Client: Connected to server");
        socket.write(JSON.stringify(['get', dataToChange]) + '\n');
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
                versions.push({ip: machines[i].ip, data: dataFromServer});
            }

            collect(i + 1, machines, versions, callback);
        }
    });
}

collect_start(machines);
