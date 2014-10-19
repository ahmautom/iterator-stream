var stream = require('stream');
var expect = require('expect.js');
var MapStream = require('../lib/transformations/map');
var DestStream = require('../lib/transformations/dest');
var IteratorStream = require('../lib/iteratorstream');

describe('MapStream', function() {
    describe('#_transform', function() {
        var iterable;
        var itStream;
        var mapStream;

        beforeEach(function() {
            iterable = [1, 2, 3, 4, 5];
            itStream = new IteratorStream([1, 2, 3, 4, 5]);
            mapStream = new MapStream(function(x) {
                return x * 3;
            });
        });

        it('is a stream', function() {
            expect(mapStream).to.be.a(stream);
        });

        it('map', function(done) {
            var result = [];
            itStream
                .pipe(mapStream)
                .pipe(DestStream(result));

            process.nextTick(function() {
                expect(result).to.eql([3, 6, 9, 12, 15]);
                done();
            });
        });
    });
});