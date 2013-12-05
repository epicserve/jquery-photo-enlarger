/*! jquery-photo-enlarger.js v0.0.0 | (c) 2013 Brent O'Connor | The MIT License (MIT)
*/

'use strict';

(function($) {

    $.fn.PhotoEnlarger = function(options) {

        var plugin = this,
            default_options = {
                'max_width_container': null,
                'caption_fadein_speed': 500,
                'caption_fadeout_speed': 500,
                'enlarge_speed': 300,
                'shrink_speed': 300,
                'add_caption_function': null
            };

        plugin.options = $.extend(default_options, options);
        plugin.enlarge = function($thumb) {
            var $thumb_img = $thumb.find('img:first'),
                $thumb_lg_div = $('<div class="thumb-large">'),
                $thumb_lg_img = $('<img>');

            $thumb_lg_img.attr('src', $thumb_img.data('large_photo'));

            $thumb_lg_img.imagesLoaded().done(function() {

                var lg_img_orig_width = $thumb_lg_img[0].width,
                    lg_img_orig_height = $thumb_lg_img[0].height,
                    $caption = $('<div class="caption"><p></p></caption>'),
                    $state_icon = $('<div class="state-icon">'),
                    caption_text = $thumb_img.data('caption'),
                    max_width = lg_img_orig_width,
                    max_height = lg_img_orig_height;

                if (typeof $thumb.max_width !== 'undefined' && typeof $thumb.max_height !== 'undefined') {
                    max_width = $thumb.max_width;
                    max_height = $thumb.max_height;
                } else {
                    if (plugin.options.max_width_container === null) {
                        max_width = $thumb.parent().parent().width();
                    } else if (plugin.options.max_width_container instanceof $) {
                        max_width = plugin.options.max_width_container.width();
                    }

                    if (lg_img_orig_width > max_width) {
                        max_height = lg_img_orig_height * (max_width / lg_img_orig_width);
                    }

                    // save the widths and heights to the thumb instance
                    $thumb.max_width = max_width;
                    $thumb.max_height = max_height;
                    $thumb.width = $thumb_img[0].width;
                    $thumb.height = $thumb_img[0].height;
                }

                $thumb_lg_div.hide();
                $thumb_lg_div.css({width: $thumb.width, height: $thumb.height});
                $thumb_lg_div.append($thumb_lg_img).append($state_icon);
                $thumb.append($thumb_lg_div);
                $thumb_lg_div.show();
                $thumb_lg_div.animate({width: max_width, height: max_height}, plugin.options.enlarge_speed, function() {

                    if (typeof plugin.options.add_caption_function === 'function') {
                        plugin.options.add_caption_function($caption, caption_text, $thumb_lg_div, plugin);
                    } else if (typeof caption_text !== 'undefined' && caption_text !== '') {
                        $caption.find('p:first').html(caption_text);
                        $thumb_lg_div.append($caption);
                        $thumb_lg_div.hover(
                            function() { $caption.fadeIn(plugin.options.caption_fadein_speed); },
                            function() { $caption.fadeOut(plugin.options.caption_fadeout_speed); }
                        );
                    }

                    $thumb_lg_img.click(function() { plugin.shrink($thumb); });
                    $state_icon.click(function() { plugin.shrink($thumb); });

                });

            });

        };

        plugin.shrink = function($thumb) {

            var $thumb_lg_div = $thumb.find('.thumb-large:first'),
                $caption = $thumb_lg_div.find('.caption:first'),
                shrink_photo = function() {
                    $thumb_lg_div.animate({width: $thumb.width, height: $thumb.height}, plugin.options.shrink_speed, function() {
                        $thumb_lg_div.remove();
                    });
                };

            if ($caption.length === 0) {
                shrink_photo();
            } else {
                $caption.fadeOut(100, shrink_photo);
            }

        };

        return plugin.each(function() {

            var $thumb = $(this),
                $thumb_img = $thumb.find('img:first'),
                $state_icon = $('<div class="state-icon">'),
                large_img_url = $thumb_img.data('large_photo'),
                _img = new Image();

            // pre-load large images
            _img.src = large_img_url;

            $state_icon.click(function() { plugin.enlarge($thumb); });
            $thumb_img.click(function() {
                plugin.enlarge($thumb);
            });
            $thumb.append($state_icon);

            return $thumb;
        });

    };

}(jQuery));