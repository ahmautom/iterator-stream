var Readable = require('stream').Readable;
var util = require('util');

function IteratorStream(iterable) {
    if (!(this instanceof IteratorStream)) {
        return new IteratorStream(iterable);
    }

    Readable.call(this, {
        objectMode: true
    });
    this._iterator = iterable[Symbol.iterator]();
}

util.inherits(IteratorStream, Readable);

IteratorStream.prototype._read = function() {
    var next = this._iterator.next();
    if (next.done) {
        this.push(null);
    } else {
        this.push(next.value);
    }
}

module.exports = IteratorStream;