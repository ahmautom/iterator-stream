var Transform = require('stream').Transform;
var util = require('util');

function RejectStream(func) {
    if (!(this instanceof RejectStream)) {
        return new RejectStream(func);
    }

    Transform.call(this, {
        objectMode: true
    });
    this.func = func;
}

util.inherits(RejectStream, Transform);

RejectStream.prototype._transform = function(chunk, encoding, callback) {
    var self = this;

    if (this.func.length > 1) {
        this.func(chunk, function(err, reject) {
            if (err) {
                return callback(err);
            }

            if (!reject) {
                self.push(chunk);
            }

            callback();
        });
    } else {
        try {
            var reject = this.func(chunk);
        } catch (err) {
            callback(err);
        }

        if (!reject) {
            self.push(chunk);
        }

        callback();
    }
}

module.exports = RejectStream;