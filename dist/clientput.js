"use strict";

var net = require("net");
var machines = require("./machines.js");

// Create a socket (client) that connects to the server


var versions = [];
var date = new Date();
var dataToChange = {
    key: 'three',
    value: 'creating',
    date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
};

/**
 * Get machines that match with element key
 */
machines.machines.forEach(function (machine) {
    console.log("Máquina encontrada: %s", machine[1].ip);

    var socket = new net.Socket();

    var buffer = '';

    socket.connect(machine[1].ip, "localhost", function () {
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
                versions.push([machine[1].ip, dataFromServer]);
            }
            console.log(versions);
        }
    });

    socket.write(JSON.stringify(['put', dataToChange]) + '\n');
});

//
// versions.forEach(function (machine){
//
//     var socket = new net.Socket();
//
//     var buffer = '';
//
//     socket.connect(machine[0], "localhost", function () {
//         console.log("Client: Connected to server");
//     });
//
//     socket.on("data", function (data) {
//         if (data.indexOf('\n') < 0) {
//             buffer += data;
//         } else {
//             data = data.toString();
//             var msg = buffer + data.substring(0, data.indexOf('\n'));
//             buffer = data.substring(data.indexOf('\n') + 1);
//             var dataFromServer = JSON.parse(msg);
//
//             console.log(dataFromServer);
//
//             if(dataFromServer[0] == dataToChange.key){
//                 versions.push([machine[1].ip, dataFromServer]);
//             }
//         }
//     });
//
//     socket.write(JSON.stringify(['put', dataToChange]) + '\n');
// });
//# sourceMappingURL=clientput.js.map