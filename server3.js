const net = require("net");

var server = net.createServer(function (conn) {
    console.log("Server: Client connected");

    var hashtable = [['three', {value: 'server 3', date: "4/7/2017"}], ['five', {value: 15, date: "5/7/2017"}]];

    // Handle data from client
    var buffer = '';
    conn.on("data", function (data) {
        if (data.indexOf('\n') < 0) {
            buffer += data;
        } else {
            data = data.toString();
            var msg = buffer + data.substring(0, data.indexOf('\n'));
            buffer = data.substring(data.indexOf('\n') + 1);
            var dataMessage = JSON.parse(msg);

            doActions(dataMessage);
        }

        console.log("Response from client: %s", data.response);
    });

    function doActions(obj) {
        var hasKey = false;
        var tableChecked = [];
        hashtable.forEach(function (table) {
            console.log("Data: %s", table[0]);
            if (table[0] == obj[1].key) {
                hasKey = true;
                tableChecked = table;
                tableChecked[1].key = obj[1].key;
                console.log("Escolhido: %s", table[0]);
            }
        });
        console.log(obj[1].key);

        if (obj[0] == 'put') {
            hashtable.forEach(function (table) {
                console.log("Date: %s", table[1].date);
                console.log("Date: %s", obj[1].date);
                if (table[0] == obj[1].key) {
                    hasKey = true;
                    tableChecked = table;
                    table[1].value = obj[1].value;
                    table[1].date = obj[1].date;
                    console.log("Updated: %s", JSON.stringify(table));
                    conn.write(JSON.stringify(hashtable) + '\n');
                }
            });
            if (!hasKey) {
                hashtable.push([obj[1].key, {value: obj[1].value, date: obj[1].date}]);

                hashtable.forEach(function (table) {
                    if (table[0] == obj[1].key) {
                        console.log("Created: %s", JSON.stringify(table));
                    }
                });
            }
        }

        if (obj[0] == 'get') {
            if (hasKey)
                conn.write(JSON.stringify(tableChecked) + '\n');
            else
                conn.write(JSON.stringify('Não há chave') + '\n');
        }
    }

    conn.on("end", function () {
        console.log('Server: Client disconnected');
    });

    conn.on('error', (err) => {
        console.error(err);
    });
});

// Listen for connections
server.listen(61339, "localhost", function () {
    console.log("Server: Listening");
});