var Transform = require('stream').Transform;
var util = require('util');

function MapStream(func) {
    if (!(this instanceof MapStream)) {
        return new MapStream(func);
    }

    Transform.call(this, {
        objectMode: true
    });
    this.func = func;
}

util.inherits(MapStream, Transform);

MapStream.prototype._transform = function(chunk, encoding, callback) {
    if(this.func.length > 1){
        this.func(chunk, callback);
    }else{
        try{
            var result = this.func(chunk);
        }catch(err){
            callback(err);
        }

        callback(null, result);
    }
}

module.exports = MapStream;