const net = require("net");
const machines = require("./machines.js");

// Create a socket (client) that connects to the server


machines.machines.forEach(function (machine){
    console.log("Data: %s",  machine[1].ip);
    var socket = new net.Socket();
    socket.connect(machine[1].ip, "localhost", function () {
        console.log("Client: Connected to server");

        // machines.machines.forEach(function (machine){
        //     console.log("Data: %s",  machine[1].ip);
        //
        // })
    });

})
// socket.connect(61337, "localhost", function () {
//     console.log("Client: Connected to server");
//
//     machines.machines.forEach(function (machine){
//         console.log("Data: %s",  machine[1].ip);
//
//     })
// });
//
// socket.on("put", function (data) {
//     data = JSON.parse(data);
//     console.log("Response from server: %s", data.response);
//
//
//     // ENVIA DADOS PRO SERVER
//     socket.write(JSON.stringify({key: 'one', value: 'valor', date: 'data'}));
//     // Close the connection
//     socket.end();
// });
//
// // Let's handle the data we get from the server
// socket.on("data", function (data) {
//     data = JSON.parse(data);
//     console.log("Response from server: %s", data.response);
//
//
//     // ENVIA DADOS PRO SERVER
//     socket.write(JSON.stringify({key: 'one', value: 'valor', date: 'data'}));
//     // Close the connection
//     // socket.end();
// });
