/*global describe, it */

// so the linter doesn't freak
var assert = assert || {},
    expect = expect || {};

(function (assert, expect, $) {

    'use strict';

    describe('Events', function() {

        describe('First small thumb', function() {

            it('should have click a event bound to it', function() {
                var $firstImg = $('.thumb:first img:first'),
                    _data = $._data($firstImg[0]);
                expect(_data.events).to.have.property('click');
                expect(_data.events.click).to.be.an('Array');
                expect(_data.events.click).to.have.length(1);
            });

        });

        describe('First thumb enlarged', function() {

            it('should have a click event bound to the large image and icon', function(done) {

                $('.thumb:first img:first').click();
                setTimeout(function() {
                    var $thumb = $('.thumb:first'),
                        $thumb_img = $thumb.find('img:first'),
                        $large_img = $thumb.find('.thumb-large:first img:first'),
                        $icon = $thumb.find('.thumb-large:first .state-icon:first'),
                        _data = $._data($large_img[0]),
                        _icon_data = $._data($icon[0]);

                    // check large image data
                    expect(_data.events).to.have.property('click');
                    expect(_data.events.click).to.be.an('Array');
                    expect(_data.events.click).to.have.length(1);
                    expect($thumb_img[0]).to.have.property('width');
                    expect($thumb_img[0]).to.have.property('height');
                    expect($thumb_img[0].width).to.equal(210);
                    expect($large_img[0]).to.have.property('width');
                    expect($large_img[0]).to.have.property('height');
                    expect($large_img[0].width).to.be.above($thumb_img[0].width);

                    // check icon data
                    expect(_icon_data.events).to.have.property('click');
                    expect(_icon_data.events.click).to.be.an('Array');
                    expect(_icon_data.events.click).to.have.length(1);

                    $large_img.click();
                    done();

                }, 300);
            });

        });

    });

})(assert, expect, jQuery);

