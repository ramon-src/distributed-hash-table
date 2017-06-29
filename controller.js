const net = require("net");

var Server = (function (net) {
    var _hash = [], ip = null;

    init = function () {
        net.createServer(methods);
    }

    methods = function (conn) {
        conn.on("get", function (key) {
            var value = _hash.find(key);
        });

        conn.on("put", function (content) {
            if (content[0] in _hash) {
                console.log("Chave existe");
            } else {
                _hash.push(valueArray);
                console.log("Valor inserido com sucesso");
            }
        });
    }

    return true;
})(net);