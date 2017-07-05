const net = require("net");

// Create a simple server
var server = net.createServer(function (conn) {
    console.log("Server: Client connected");
    var hashtable = [['one', {value: 1, date: "2017-06-07"}],['two', {value: 2, date: "2017-06-08"}]];
    // hashtable['data1']  = {value: 1, date: "2017-06-07"};
    // hashtable['data2']  = {value: 2, date: "2017-06-08"};
    // If connection is closed
    conn.on("end", function() {
        console.log('Server: Client disconnected');
        // Close the server
        // server.close();
        // // End the process
        // process.exit(0);
    });

    // Handle data from client
    conn.on("data", function(data) {
        data = JSON.parse(data);
        hashtable.forEach(function (table){
            console.log("Data: %s",  table[0]);
            if(table[0] == data.key){
                console.log("Escolhido: %s",  table[0]);
            }
        })
        // for(var data in hashtable){
        // }
        console.log("Response from client: %s", data.response);
    });

    // Handle data from client
    conn.on("put", function(data) {
        data = JSON.parse(data);
        hashtable.forEach(function (table){
            if(table[0] == data.key){
                console.log("Escolhido: %s",  table[0]);
            }
        })
        // for(var data in hashtable){
        // }
        console.log("Response from client: %s", data.response);
    });

    conn.on('error', (err) => {
        // If the connection is reset by the server, or if it can't
        // connect at all, or on any sort of error encountered by
        // the connection, the error will be sent here.
        console.error(err);
    });
    // Let's response with a hello message
    conn.write(
        JSON.stringify(
            { response: "Hey there client!" }
        )
    );

});

// Listen for connections
server.listen(61337, "localhost", function () {
    console.log("Server: Listening");
});