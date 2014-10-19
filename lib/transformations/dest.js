var through = require('through');

module.exports = filterStream;

function filterStream(coll) {
    return through(function(data) {
        coll.push(data);
    });
}