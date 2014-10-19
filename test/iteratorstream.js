var stream = require('stream');
var expect = require('expect.js');
var is = require('../lib');

describe('iterator-stream', function() {
    describe('#createIteratorStream', function() {
        var iterable;
        var itStream;

        beforeEach(function() {
            iterable = [1, 2, 3, 4, 5];
            itStream = is.createIteratorStream([1, 2, 3, 4, 5]);
        });

        it('is a stream', function() {
            expect(itStream).to.be.a(stream);
        });

        it('iterate through the iterable', function(done) {
            var result = [];
            itStream
                .pipe(is.map(function(x) {
                    return x * 3;
                }))
                .pipe(is.filter(function(x) {
                    return x % 2 === 0;
                }))
                .pipe(is.take(2))
                .pipe(is.dest(result));

            process.nextTick(function() {
                expect(result).to.eql([6, 12]);
                done();
            });
        });
    });
});