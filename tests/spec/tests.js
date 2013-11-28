/*global describe, it */

// so the linter doesn't freak
var assert = assert || {},
    expect = expect || {};

(function (assert, expect, $) {

    'use strict';

    describe('Events', function() {

        describe('First small thumb', function() {

            it('should have click a event bound to it', function() {
                var $firstImg = $('.thumb img:first'),
                    _data = $._data($firstImg[0]);
                expect(_data.events).to.have.property('click');
                expect(_data.events.click).to.be.an('Array');
                expect(_data.events.click).to.have.length(1);
            });

        });

    });

})(assert, expect, jQuery);

