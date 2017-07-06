"use strict";

var net = require("net");
var machines = require("./machines.js");

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

collect_start = function collect_start(machines, cb) {
    collect(0, machines, {}, cb);
};

collect = function (_collect) {
    function collect(_x, _x2, _x3, _x4) {
        return _collect.apply(this, arguments);
    }

    collect.toString = function () {
        return _collect.toString();
    };

    return collect;
}(function (i, machines, versions, cb) {

    if (i >= machines.length) cb(versions);

    console.log("Máquina encontrada: %s", machine[1].ip);

    var socket = new net.Socket();

    var buffer = '';

    socket.connect(machine[i].ip, "localhost", function () {
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
                versions.push([machine[1].ip, dataFromServer]);
            }

            collect(i + 1, machines, versions, cb);
        }
    });
});
machines.machines.forEach(function (machine) {});

versions.forEach(function (machine) {
    console.log(machine);
    // var socket = new net.Socket();
    //
    // var buffer = '';
    //
    // socket.connect(machine[0], "localhost", function () {
    //     console.log("Client by machine: Connected to server");
    // });
    //
    // socket.on("data", function (data) {
    //     if (data.indexOf('\n') < 0) {
    //         buffer += data;
    //     } else {
    //         data = data.toString();
    //         var msg = buffer + data.substring(0, data.indexOf('\n'));
    //         buffer = data.substring(data.indexOf('\n') + 1);
    //         var dataFromServer = JSON.parse(msg);
    //
    //         console.log(dataFromServer);
    //
    //         if(dataFromServer[0] == dataToChange.key){
    //             versions.push([machine[1].ip, dataFromServer]);
    //         }
    //     }
    // });
    //
    // socket.write(JSON.stringify(['put', dataToChange]) + '\n');
});
//# sourceMappingURL=client.js.map