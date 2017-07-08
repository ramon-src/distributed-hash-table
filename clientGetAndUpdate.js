const net = require("net");
const machines = require("./machines.js").machines;

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
var cb = function (versions) {

    console.log('Versions: ');
    console.log(versions);
    var currentVersion = versions.reduce(function (a, b) {
        return (new Date(a.data.date) > new Date(b.data.date)) ? a : b;
    });

    console.log('The most current version: ');
    console.log(currentVersion);

    versions.forEach(function (machine) {

        var socket = new net.Socket();
        var buffer = '';

        socket.connect(machine.ip, "localhost", function () {
            console.log("Client: Connected to server %s get and update versions", machine.ip);

            socket.write(JSON.stringify(['put', currentVersion.data]) + '\n');
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
            }
        });
        socket.on('error', (err) => {
            console.error(err);
        });
    });
}

var collect_start = function (machines, callback) {
    collect(0, machines, versions, callback);
}

var collect = function (i, machines, versions, cb) {

    if (i >= machines.length) {
        cb(versions);
        return;
    }

    var socket = new net.Socket();
    var buffer = '';

    socket.connect(machines[i].ip, "localhost", function () {
        console.log("Client: Connected to server from port %s", machines[i].ip);

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

            console.log('Data found from server: ');
            console.log(dataFromServer);

            if (dataFromServer[0] == dataToChange.key) {
                versions.push({ip: machines[i].ip, data: dataFromServer[1]});
            }

            collect(i + 1, machines, versions, cb);
        }
    });
}

collect_start(machines, cb);
