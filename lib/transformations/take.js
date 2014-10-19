var Transform = require('stream').Transform;
var util = require('util');

function TakeStream(num) {
    if (!(this instanceof TakeStream)) {
        return new TakeStream(num);
    }

    Transform.call(this, {
        objectMode: true
    });
    this.num = num;
}

util.inherits(TakeStream, Transform);

TakeStream.prototype._transform = function(chunk, encoding, callback) {
    if (this.num-- > 0) {
        callback(null, chunk);
    } else {
        this.end();
    }
}

module.exports = TakeStream;