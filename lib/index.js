var IteratorStream = require('./iteratorstream');
var map = require('./transformations/map');
var filter = require('./transformations/filter');
var take = require('./transformations/take');
var dest = require('./transformations/dest');

module.exports.createIteratorStream = createIteratorStream;

function createIteratorStream(iterable) {
    return new IteratorStream(iterable);
}

module.exports.map = map;
module.exports.filter = filter;
module.exports.take = take;
module.exports.dest = dest;