const net = require("net");

// Create a simple server
var server = net.createServer(function (conn) {
    var _hashtable = [
        ['teste', {'valor': 151, 'date': new Date()}],
        ['teste2', {'valor': 1513, 'date': new Date()}],
        ['teste3', {'valor': 151, 'date': new Date()}],
    ];
    console.log("Server: Client connected");

    // If connection is closed
    conn.on("end", function () {
        console.log('Server: Client disconnected');
        // Close the server
        server.close();
        // End the process
        process.exit(0);
    });

    // Handle data from client
    conn.on("put", function (data) {
        var foundEl = false;
        var message = "Element was ";
        _hashtable.forEach(function (obj) {
            if (obj[0] == data[0]) {
                obj = data;
                obj[1].date = new Date();
                foundEl = true;
                message = "updated";
            }
        });
        if (!foundEl) {
            _hashtable.push(data);
            message = "created";
        }
        data = JSON.parse(data);
        console.log("Response from client: %s", data.response);
    });

    // Let's response with a hello message
    conn.write(
        JSON.stringify(
            {response: "Hey there client!"}
        )
    );
});

// Listen for connections
server.listen(61337, "localhost", function () {
    console.log("Server: Listening");
});
