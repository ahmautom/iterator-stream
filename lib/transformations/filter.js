var Transform = require('stream').Transform;
var util = require('util');

function FilterStream(func) {
    if (!(this instanceof FilterStream)) {
        return new FilterStream(func);
    }

    Transform.call(this, {
        objectMode: true
    });
    this.func = func;
}

util.inherits(FilterStream, Transform);

FilterStream.prototype._transform = function(chunk, encoding, callback) {
    var self = this;

    if (this.func.length > 1) {
        this.func(chunk, function(err, keep) {
            if (err) {
                return callback(err);
            }

            if (keep) {
                self.push(chunk);
            }

            callback();
        });
    } else {
        try {
            var keep = this.func(chunk);
        } catch (err) {
            callback(err);
        }

        if (keep) {
            self.push(chunk);
        }

        callback();
    }
}

module.exports = FilterStream;