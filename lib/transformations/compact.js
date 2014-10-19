var Transform = require('stream').Transform;
var util = require('util');

function CompactStream() {
    if (!(this instanceof CompactStream)) {
        return new CompactStream();
    }

    Transform.call(this, {
        objectMode: true
    });
}

util.inherits(CompactStream, Transform);

CompactStream.prototype._transform = function(chunk, encoding, callback) {
    if (chunk) {
        this.queue(data);
    }

    callback();
}

module.exports = CompactStream;