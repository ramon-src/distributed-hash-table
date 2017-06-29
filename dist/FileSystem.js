"use strict";

var FileSystem = function () {
    var init = function (doc) {
        var _private = {};
        var _public = {};
        var _config = {};

        _private.hashTable = [];

        _public.add = function (entryObj) {

            _private.hashTable.filter(function (obj) {
                if (entryObj.id == obj.id) {
                    obj = entryObj;
                    obj.data.date = new Date();
                }
            });

            entryObj.data.date = new Date();
            _private.hashTable.push(entryObj);
        };
        _public.remove = function (key) {
            for (var obj in _private.hashTable) {
                if (key in obj.key) {
                    _private.hashTable.splice();
                }
            }
        };
        return _public;
    }(doc);
    return init;
}();
//# sourceMappingURL=FileSystem.js.map